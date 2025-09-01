
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './config';

interface RouteConfig {
	path: string;
	element: React.ReactNode;
	children?: RouteConfig[];
	[key: string]: any;
}

// 递归渲染路由
function renderRoutes(routeList: RouteConfig[]) {
	return routeList.map(route => (
		<Route
			key={route.path}
			path={route.path}
			element={route.element}
		>
			{route.children ? renderRoutes(route.children) : null}
		</Route>
	));
}


const RouteList = () => (
	<Suspense fallback={<div>加载中...</div>}>
		<Routes>
			{renderRoutes(routes)}
			{/* 兜底路由 */}
			<Route path="*" element={<React.Fragment>{routes.find(r => r.path === '/notfound')?.element}</React.Fragment>} />
		</Routes>
	</Suspense>
);

export default RouteList;
