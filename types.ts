export enum AgeGroup {
  TODDLER = 'TODDLER', // 0-5
  CHILD = 'CHILD',     // 6-12
  TEEN = 'TEEN',       // 13-18
  YOUNG = 'YOUNG',     // 18-30
  ADULT = 'ADULT',     // 30-60
  SENIOR = 'SENIOR'    // 60+
}

export enum Gender {
  BOY = 'BOY',
  GIRL = 'GIRL',
  BOTH = 'BOTH' // Internal use for activities that fit everyone
}

export enum Category {
  CREATIVE = 'יצירה',
  PHYSICAL = 'ספורט ותנועה',
  INTELLECTUAL = 'מחשבה',
  FUN = 'סתם כיף',
  CHORE = 'מטלות',
  SOCIAL = 'חברתי',
  OUTDOORS = 'בחוץ',
  COOKING = 'בישול',
  MUSIC = 'מוזיקה',
  DIGITAL = 'דיגיטל'
}

export interface Activity {
  id: string;
  text: string;
  categories: Category[];
  suitableAges: AgeGroup[];
  suitableGenders: (Gender | 'BOTH')[]; // Can be specific or both
  description?: string;
  icon?: any; // Component type for the icon
}

export interface UserPreferences {
  ageGroup: AgeGroup | null;
  gender: Gender | null;
}