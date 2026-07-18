import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationsRead, type ZolaNotification } from "@/lib/api";

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  });

  const unread = (query.data ?? []).filter((n) => !n.read);

  async function markRead(ids: string[]) {
    await markNotificationsRead(ids);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }

  return {
    notifications: query.data ?? [],
    unreadCount: unread.length,
    unreadNotifications: unread,
    markRead,
    isLoading: query.isLoading,
  };
}
