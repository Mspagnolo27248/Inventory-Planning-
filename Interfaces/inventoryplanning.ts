interface Receipt {
    ProductCode: string;
    ProductDesc?: string | null;
    Date: Date;
    Qty: number;
  }
  
  interface BlendRequirements {
    Finished_ProductCode: string;
    Component_ProductCode: string;
    Finished_ProductDesc?: string | null;
    Component_ProductDesc?: string | null;
    BlendPercent: number;
  }
  
  interface CurrentInventory {
    id: number;
    ProductCode: string;
    Qty?: number | null;
  }
  
  interface EndingInventory {
    Date: Date;
    ProductCode: string;
    ProductDesc?: string | null;
    BeginInventory?: number | null;
    Receipts?: number | null;
    ProductionIn?: number | null;
    ProductionOut?: number | null;
    Demand?: number | null;
    BlendedOut?: number | null;
    EndingInventory?: number | null;
  }
  
  interface GeneralData {
    id: number;
    Metric?: string | null;
    Value?: string | null;
  }
  
  interface MonthlyDemandForecast {
    YYYYMM: string;
    Finished_ProductCode: string;
    Finished_ProductDesc?: string | null;
    Qty?: number | null;
  }
  
  interface Products {
    id: number;
    ProductCode: string;
    ProductDescription: string;
    ClassCode: string;
    Division: string;
  }
  
  interface RunningDays {
    Date?: Date | null;
  }
  
  interface Schedule {
    Unit: string;
    Date: Date;
    Charge_ProductCode: string;
    Charge_ProductDesc: string;
    Qty: number;
  }
  
  interface UnitChargeProducts {
    Unit: string;
    Charge_ProductCode: string;
    Charge_ProductDesc: string;
    MaxDailyRate: number;
  }
  
  interface Units {
    UnitCode: string;
  }
  
  interface UnitYields {
    Unit: string;
    Charge_ProductCode: string;
    Charge_ProductDesc?: string | null;
    Finished_ProductCode: string;
    Finished_ProductDesc?: string | null;
    OutputPercent: number;
  }
  