/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import App from "../App";
import {  createHashRouter } from "react-router-dom";
import Result404 from "@/components/NotFound";

const ErrorBoundary = lazy(() => import('@/components/ErrorPage/index'))
const Datamanage = lazy(() => import('@/pages/data-metacomponents/datamanage'))
const Detail = lazy(() => import('@/pages/konwledge-metacomponents/index'))
const Datafusion = lazy(() => import('@/pages/data-metacomponents/datafusion'))
const DecisionMaking = lazy(() => import('@/pages/decision-metacomponents/decisionMaking'))
const EarlyWarning = lazy(() => import('@/pages/decision-metacomponents/earlyWarning'))
const Prediction = lazy(() => import('@/pages/decision-metacomponents/prediction'))
const ProduceChain = lazy(() => import('@/pages/data-metacomponents/dataperceive/produce'))
const SalesChain = lazy(() => import('@/pages/data-metacomponents/dataperceive/sale'))
const WealthChain = lazy(() => import('@/pages/data-metacomponents/dataperceive/wealth'))
const LogisticsChain = lazy(() => import('@/pages/data-metacomponents/dataperceive/logistics'))
const ManpowerChain = lazy(() => import('@/pages/data-metacomponents/dataperceive/manpower'))

const rootLoader = async () => {
  return {
    isAdmin: true,
  }
}

const routes = [
  {
    path: "/",
    id: 'root',
    element: <App />,
    loader: rootLoader,
    errorElement: <ErrorBoundary />,
    name: "menuRoutes",
    children: [
      {
        path: '/data-metacomponents',
        title: "数据元",
        children: [
          {
            path: "/data-metacomponents/datamanage",
            title: "数据管理",
            element: <Datamanage />,
          },
          {
            path: "/data-metacomponents/dataperceive",
            title: "数据感知",
            children: [
              {
                path: "/data-metacomponents/dataperceive/manpower",
                title: "人力链",
                element: <ManpowerChain />
              },
              {
                path: "/data-metacomponents/dataperceive/wealth",
                title: "资金链",
                element: <WealthChain />
              },
              {
                path: "/data-metacomponents/dataperceive/logistics",
                title: "物流链",
                element: <LogisticsChain />
              },
              {
                path: "/data-metacomponents/dataperceive/produce",
                title: "生产链",
                element: <ProduceChain />
              },
              {
                path: "/data-metacomponents/dataperceive/sale",
                title: "销售链",
                element: <SalesChain />
              },

            ]
          },
          {
            path: "/data-metacomponents/datafusion",
            title: "数据融合",
            element: <Datafusion />
          },
        ]
      },
      {
        path: '/konwledge-metacomponents',
        title: "知识元",
        children: [
          {
            path: "/konwledge-metacomponents/cost",
            title: "成本优先",
            element: <Detail id={1} />
          },
          {
            path: "/konwledge-metacomponents/serve",
            title: "服务优先",
            element: <Detail id={2} />
          },
          {
            path: "/konwledge-metacomponents/quality",
            title: "质量优先",
            element: <Detail id={3} />
          },
          {
            path: "/konwledge-metacomponents/efficiency",
            title: "效率优先",
            element: <Detail id={4} />
          }
        ]
      },
      {
        path: '/decision-metacomponents',
        title: "决策元",
        children: [
          {
            path: "/decision-metacomponents/dataperceive/staff",
            title: "人力链",
            children: [
              {
                path: "/decision-metacomponents/dataperceive/staff/prediction",
                title: "预测",
                element: <Prediction />
              },
              {
                path: "/decision-metacomponents/dataperceive/staff/prewarning",
                title: "预警",
                element: <EarlyWarning />
              },
              {
                path: "/decision-metacomponents/dataperceive/staff/decision",
                title: "决策",
                element: <DecisionMaking />
              }
            ]
          },
          {
            path: "/decision-metacomponents/dataperceive/wealth",
            title: "资金链",
            children: [
              {
                path: "/decision-metacomponents/dataperceive/wealth/prediction",
                title: "预测",
                element: <Prediction />
              },
              {
                path: "/decision-metacomponents/dataperceive/wealth/prewarning",
                title: "预警",
                element: <EarlyWarning />
              },
              {
                path: "/decision-metacomponents/dataperceive/wealth/decision",
                title: "决策",
                element: <DecisionMaking />
              }
            ]
          },
          {
            path: "/decision-metacomponents/dataperceive/convey",
            title: "物流链",
            children: [
              {
                path: "/decision-metacomponents/dataperceive/convey/prediction",
                title: "预测",
                element: <Prediction />
              },
              {
                path: "/decision-metacomponents/dataperceive/convey/prewarning",
                title: "预警",
                element: <EarlyWarning />
              },
              {
                path: "/decision-metacomponents/dataperceive/convey/decision",
                title: "决策",
                element: <DecisionMaking />
              }
            ]
          },
          {
            path: "/decision-metacomponents/dataperceive/production",
            title: "生产链",
            children: [
              {
                path: "/decision-metacomponents/dataperceive/production/prediction",
                title: "预测",
                element: <Prediction />
              },
              {
                path: "/decision-metacomponents/dataperceive/production/prewarning",
                title: "预警",
                element: <EarlyWarning />
              },
              {
                path: "/decision-metacomponents/dataperceive/production/decision",
                title: "决策",
                element: <DecisionMaking />
              }
            ]
          },
          {
            path: "/decision-metacomponents/dataperceive/sale",
            title: "销售链",
            children: [
              {
                path: "/decision-metacomponents/dataperceive/sale/prediction",
                title: "预测",
                element: <Prediction />
              },
              {
                path: "/decision-metacomponents/dataperceive/sale/prewarning",
                title: "预警",
                element: <EarlyWarning />
              },
              {
                path: "/decision-metacomponents/dataperceive/sale/decision",
                title: "决策",
                element: <DecisionMaking />
              }
            ]
          },


        ]
      },
      {
        path: "*",
        element: <Result404 />
      },
    ],
  },
  {
    path: "/login",
  }
];

export { routes };

const globalBorwserRouter = createHashRouter(routes)

export default globalBorwserRouter;