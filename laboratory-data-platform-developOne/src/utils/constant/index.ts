// 一级菜单
export enum firstLevelMenuEnum {
  'staff' = '人力链',
  'wealth' = '资金链',
  'convey' = '物流链',
  'production' = '生产链',
  'sale' = '销售链',
}

// 二级菜单
export enum secondaryMenuEnum {
  'prediction' = '预测',
  'earlyWarning' = '预警',
  'decisionMaking' = '决策',
}

//翻译参照表
export const translationTable: any = {
  '人员数量': 'amount',
  '研发费用': 'research',
  '设备费用': 'device',
  '生产费用': 'production',
  '仓储费用': 'storage',
  '物料费用': 'materiel',
  '运输费用': 'transportation',
  '人工费用': 'salary',
  '利润': 'profit',
  '流动资产': 'cashAssets',
  '融资': 'finance',
  '运输数量': 'quantity',
  '运输剩余库存': 'inventory',
  '运输里程数': 'mileage',
  '运输费用1': 'cost',
  '生产产量': 'quantity',
  '生产费用1': 'cost',     
  '产品销量': 'quantity',
  '销售营收': 'income',
  '销售费用': 'cost',
  '产品库存': 'inventory',
  '销售服务': 'score'
}

// 预警页左上角标题
export enum earlyWarningTitle {
  'staff' = '人力链预警情况',
  'wealth' = '资金链预警情况',
  'convey' = '物流链预警情况',
  'production' = '生产链预警情况',
  'sale' = '销售链预警情况',
}

// 预警页人力链阈值波动范围
export enum earlyWarningStaffTFR {
  '人员数量' = 'amount',
}

// 预警页资金链阈值波动范围
export enum earlyWarningWealthTFR {
  '研发费用' = 'research',
  '设备费用' = 'device',
  '生产费用' = 'production',
  '仓储费用' = 'storage',
  '物料费用' = 'materiel',
  '运输费用' = 'transportation',
  '人工费用' = 'salary',
  '利润' = 'profit',
  '流动资产' = 'cashAssets',
  '融资' = 'finance',
}

// 预警页物流链阈值波动范围
export enum earlyWarningConveyTFR {
  '运输数量' = 'quantity',
  '运输剩余库存' = 'inventory',
  '运输里程数' = 'mileage',
  '运输费用1' = 'cost',
}

// 预警页生产链阈值波动范围
export enum earlyWarningProductionTFR {
  '生产产量' = 'quantity',
  '生产费用1' = 'cost',
}

// 预警页销售链阈值波动范围
export enum earlyWarningSaleTFR {
  '产品销量' = 'quantity',
  '销售营收' = 'income',
  '销售费用' = 'cost',
  '产品库存' = 'inventory',
  '销售服务' = 'score',
}

//企业自有人员以及合作方人员个数
export const employee = {
  1: '自有人员',
  2: '合作方人员',

};
// // 员工类型
// export const employeeTypes = {
//   1: '管理人员',
//   2: '技术员工',
//   3: '销售人员',
//   4: '客户服务代表',
//   5: '财务人员'
// };

// 员工职位
export const employeePositions = {
  1: '部门经理',
  2: '人力资源专员',
  3: '财务分析师',
  4: '软件工程师',
  5: '市场营销经理',
  6: '销售主管',
  7: '客户关系经理',
  8: '运营专员',
  9: '研发工程师',
  10: '数据分析师',
  11: '产品经理',
  12: '设计师',
  13: '项目经理',
  14: '品质控制工程师'
};

// 运输工具
export const transportationModes = {
  1: '航空',
  2: '货船',
  3: '火车',
  4: '卡车',
  5: '集装箱'
};

// 运输货物
export const transportedGoods = {
  1: '电动汽车',
  2: '轿车',
  3: 'SUV',
  4: '敞篷车',
  5: '电冰箱',
  6: '空调',
  7: '电视',
  8: '电脑'
};

// 产品类型
export const productTypes = {
  1: '家居家电',
  2: '电子家电',
  3: '通用车',
  4: '商用车'
};

// 产品
export const products = {
  1: '电动汽车',
  2: '轿车',
  3: 'SUV',
  4: '敞篷车',
  5: '电冰箱',
  6: '空调',
  7: '电视',
  8: '电脑'
};

// 销售产品
export const soldProducts = {
  1: '电动汽车',
  2: '轿车',
  3: 'SUV',
  4: '敞篷车',
  5: '电冰箱',
  6: '空调',
  7: '电视',
  8: '电脑'
};
