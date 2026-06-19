'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Order } from '@/types';
import { formatRupiah } from '@/lib/utils';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartsProps {
  orders: Order[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ orders }) => {
  // Filter for completed orders
  const completedOrders = orders.filter((o) => o.topup_status === 'completed');

  // ───────────────────────────────────────────────────────────────────────────
  // 1. Calculate Last 7 Days Sales Trend (Line Chart)
  // ───────────────────────────────────────────────────────────────────────────
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const formatDateLabel = (date: Date) => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    return `${dayName} ${dayNum}`;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  // Initialize data map for last 7 days
  const dailySalesMap: { [key: string]: number } = {};
  last7Days.forEach((date) => {
    dailySalesMap[formatDateKey(date)] = 0;
  });

  // Accumulate completed orders into daily slots
  completedOrders.forEach((order) => {
    if (!order.created_at) return;
    const orderDateStr = order.created_at.split('T')[0];
    if (orderDateStr in dailySalesMap) {
      dailySalesMap[orderDateStr] += Number(order.selling_price || 0);
    }
  });

  const lineChartLabels = last7Days.map((d) => formatDateLabel(d));
  const lineChartDataValues = last7Days.map((d) => dailySalesMap[formatDateKey(d)]);

  const lineData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'Omset Penjualan (Rp)',
        data: lineChartDataValues,
        borderColor: '#1E3A8A', // brand navy
        backgroundColor: 'rgba(30, 58, 138, 0.05)',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: '#1E3A8A',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Omset: ${formatRupiah(context.raw as number)}`,
        },
        titleFont: { family: 'system-ui, sans-serif', size: 12 },
        bodyFont: { family: 'system-ui, sans-serif', size: 12 },
        padding: 10,
        backgroundColor: '#1E293B',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
          font: { family: 'system-ui, sans-serif', size: 11 },
        },
      },
      y: {
        border: { dash: [4, 4] },
        grid: {
          color: '#E2E8F0',
        },
        ticks: {
          color: '#64748B',
          font: { family: 'system-ui, sans-serif', size: 11 },
          callback: (value) => {
            const valNum = Number(value);
            if (valNum >= 1000000) return `${(valNum / 1000000).toFixed(1)}jt`;
            if (valNum >= 1000) return `${valNum / 1000}rb`;
            return valNum;
          },
        },
      },
    },
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 2. Calculate Game Distribution (Doughnut Chart)
  // ───────────────────────────────────────────────────────────────────────────
  const gameCounts: { [key: string]: number } = {};
  completedOrders.forEach((order) => {
    const game = order.game_name || 'Lainnya';
    gameCounts[game] = (gameCounts[game] || 0) + 1;
  });

  const doughnutLabels = Object.keys(gameCounts);
  const doughnutDataValues = Object.values(gameCounts);

  // Curated flat-palette colors for games
  const colorPalette = [
    '#1E3A8A', // Navy
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EC4899', // Pink
    '#8B5CF6', // Purple
  ];

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutDataValues,
        backgroundColor: colorPalette.slice(0, doughnutLabels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          color: '#334155',
          font: { family: 'system-ui, sans-serif', size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw} Transaksi`,
        },
        titleFont: { family: 'system-ui, sans-serif', size: 12 },
        bodyFont: { family: 'system-ui, sans-serif', size: 12 },
        padding: 10,
        backgroundColor: '#1E293B',
      },
    },
    cutout: '65%',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sales Trend Chart */}
      <div className="lg:col-span-2 bg-surface-card border border-border-default rounded-xl p-5 flex flex-col justify-between min-h-[320px]">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
            Tren Omset Penjualan (7 Hari Terakhir)
          </h3>
          <p className="text-[11px] text-ink-muted mt-0.5">
            Grafik total transaksi berstatus Berhasil per hari.
          </p>
        </div>
        
        <div className="relative flex-1 h-[220px]">
          {lineChartDataValues.every(val => val === 0) ? (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
              Belum ada omset penjualan dalam 7 hari terakhir.
            </div>
          ) : (
            <Line data={lineData} options={lineOptions} />
          )}
        </div>
      </div>

      {/* Game Distribution Chart */}
      <div className="bg-surface-card border border-border-default rounded-xl p-5 flex flex-col justify-between min-h-[320px]">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
            Distribusi Transaksi Game
          </h3>
          <p className="text-[11px] text-ink-muted mt-0.5">
            Porsi total jumlah transaksi per judul game.
          </p>
        </div>

        <div className="relative flex-1 h-[200px] flex items-center justify-center">
          {doughnutDataValues.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
              Belum ada data transaksi game.
            </div>
          ) : (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="lg:col-span-3 flex justify-end">
        <button
          onClick={() => {
            const formatDateExcel = (dateString: string) => {
              if (!dateString) return '-';
              const d = new Date(dateString);
              if (isNaN(d.getTime())) return '-';
              const day = d.getDate();
              const month = d.getMonth() + 1;
              const year = d.getFullYear();
              const hours = String(d.getHours()).padStart(2, '0');
              const minutes = String(d.getMinutes()).padStart(2, '0');
              const seconds = String(d.getSeconds()).padStart(2, '0');
              return `${day}/${month}/${year}, ${hours}.${minutes}.${seconds}`;
            };

            const printDateStr = formatDateExcel(new Date().toISOString());

            // Generate professional HTML Table for Excel matching mockup exactly
            const html = `
              <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
              <head>
              <meta charset="utf-8" />
              <!--[if gte mso 9]>
              <xml>
                <x:ExcelWorkbook>
                  <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                      <x:Name>Laporan Transaksi</x:Name>
                      <x:WorksheetOptions>
                        <x:DisplayGridlines/>
                      </x:WorksheetOptions>
                    </x:ExcelWorksheet>
                  </x:ExcelWorksheets>
                </x:ExcelWorkbook>
              </xml>
              <![endif]-->
              <style>
                table { border-collapse: collapse; }
                td, th { font-family: Calibri, Arial, sans-serif; }
              </style>
              </head>
              <body>
                <table border="0" style="border-collapse: collapse; font-family: Calibri, Arial, sans-serif;">
                  <tr style="height: 35px;">
                    <td colspan="8" style="text-align: center; font-size: 16pt; font-weight: bold; color: #1F4E78; border: 1px solid #000000; vertical-align: middle; font-family: Calibri, Arial, sans-serif;">LAPORAN TRANSAKSI - AZKA TOP UP</td>
                  </tr>
                  <tr style="height: 18px;">
                    <td colspan="8" style="text-align: left; font-size: 10pt; color: #595959; font-family: Calibri, Arial, sans-serif; vertical-align: middle; padding-top: 5px;">Dicetak pada: ${printDateStr}</td>
                  </tr>
                  <tr style="height: 18px;">
                    <td colspan="8" style="text-align: left; font-size: 10pt; color: #595959; font-family: Calibri, Arial, sans-serif; vertical-align: middle;">Total Data: ${orders.length} Transaksi</td>
                  </tr>
                  <tr style="height: 15px;">
                    <td colspan="8"></td>
                  </tr>
                </table>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; border: 1px solid #000000; font-family: Calibri, Arial, sans-serif;">
                  <thead>
                    <tr style="height: 25px; background-color: #FFFFFF;">
                      <th width="180" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 130pt;">ID Transaksi</th>
                      <th width="150" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 110pt;">Game</th>
                      <th width="200" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 140pt;">Produk</th>
                      <th width="150" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 110pt;">Target / User ID</th>
                      <th width="120" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 90pt;">Status Topup</th>
                      <th width="120" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 90pt;">Status Bayar</th>
                      <th width="120" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 90pt;">Harga (Rp)</th>
                      <th width="180" style="border: 1px solid #000000; font-weight: bold; text-align: center; font-size: 11pt; font-family: Calibri, Arial, sans-serif; background-color: #FFFFFF; color: #000000; vertical-align: middle; width: 130pt;">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orders.map(o => {
                      const topupStatus = (o.topup_status || '').toUpperCase();
                      const paymentStatus = (o.payment_status || '').toUpperCase();
                      
                      const topupColor = topupStatus === 'COMPLETED' ? '#2E7D32' : '#D97706';
                      const paymentColor = paymentStatus === 'PAID' ? '#2E7D32' : '#D97706';
                      
                      const priceVal = Number(o.selling_price || 0).toFixed(2);
                      const formattedDate = formatDateExcel(o.created_at);
                      
                      return `
                      <tr style="height: 20px;">
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: left;">${o.order_code || ''}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: left;">${o.game_name || '-'}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: left;">${o.product_name || '-'}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: left; mso-number-format:'\\@';">${o.customer_no || ''}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: center; font-weight: bold; color: ${topupColor};">${topupStatus}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: center; font-weight: bold; color: ${paymentColor};">${paymentStatus}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: right; mso-number-format:'0.00';">${priceVal}</td>
                        <td style="border: 1px solid #000000; font-size: 10pt; font-family: Calibri, Arial, sans-serif; vertical-align: middle; text-align: left;">${formattedDate}</td>
                      </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </body>
              </html>
            `;
            
            const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `Laporan_Transaksi_AzkaTopUp_${new Date().toISOString().split('T')[0]}.xls`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-[#107C41] hover:bg-[#0B5C30] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 cursor-pointer border border-transparent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Export Laporan (Excel)
        </button>
      </div>
    </div>
  );
};

export default DashboardCharts;
