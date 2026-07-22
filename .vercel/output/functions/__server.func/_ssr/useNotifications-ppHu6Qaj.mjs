import { d as markNotificationsRead, o as getNotifications } from "./api-B4kmTFOi.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useNotifications-ppHu6Qaj.js
function useNotifications() {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["notifications"],
		queryFn: getNotifications,
		refetchInterval: 5e3,
		refetchIntervalInBackground: false
	});
	const unread = (query.data ?? []).filter((n) => !n.read);
	async function markRead(ids) {
		await markNotificationsRead(ids);
		queryClient.invalidateQueries({ queryKey: ["notifications"] });
	}
	return {
		notifications: query.data ?? [],
		unreadCount: unread.length,
		unreadNotifications: unread,
		markRead,
		isLoading: query.isLoading
	};
}
//#endregion
export { useNotifications as t };
