import useSWR from 'swr';
import { api } from '@/lib/api';
import { Order } from '@/types';

const TERMINAL_STATUSES = ['completed', 'failed', 'expired', 'cancelled'];

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export function useOrderStatus(orderCode: string) {
  const { data, error, mutate } = useSWR<Order>(
    orderCode ? `/orders/${orderCode}` : null,
    fetcher,
    {
      refreshInterval: (data) => {
        if (!data) return 5000;
        const isTerminal =
          TERMINAL_STATUSES.includes(data.topup_status) ||
          ['expired', 'failed', 'cancelled'].includes(data.payment_status);
        return isTerminal ? 0 : 5000;
      },
      revalidateOnFocus: false,
    }
  );

  return {
    order: data,
    isLoading: !error && !data,
    error,
    refresh: mutate,
  };
}
