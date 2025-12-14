import { Activity, AgeGroup, Category, Gender } from './types';
import { 
  Castle, Palette, Activity as ActivityIcon, Gem, Blocks, EyeOff, FlaskConical, Music,
  Video, Bed, Dumbbell, Mail, Trash2, ChefHat, Image, Headphones,
  Wind, Spade, Calendar, Eye, BookOpen, Dice5, Music2, Library, Disc, ListTodo,
  Pill, Archive, Languages, BookHeart, Globe, Smartphone, Grid3X3,
  Club, Camera, Smile, Snowflake, Utensils, Sprout, Flower, Send, Mic, Scissors
} from 'lucide-react';

export const ACTIVITIES: Activity[] = [
  // --- TODDLER & CHILD ACTIVITIES ---
  {
    id: 'c1',
    text: 'בנו מבצר מכריות ושמיכות בסלון',
    categories: [Category.FUN, Category.CREATIVE, Category.SOCIAL],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    description: 'השתמשו בספות, כסאות וכל מה שאפשר כדי לבנות את המבצר הכי שווה.',
    icon: Castle
  },
  {
    id: 'c2',
    text: 'ציירו ציור של החיה האהובה עליכם אבל כגיבור על',
    categories: [Category.CREATIVE],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    icon: Palette
  },
  {
    id: 'c3',
    text: 'הכינו מסלול מכשולים בבית',
    categories: [Category.PHYSICAL, Category.FUN],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    description: 'אפשר לקפוץ מעל כריות, לזחול מתחת לשולחן וללכת על קו ישר.',
    icon: ActivityIcon
  },
  {
    id: 'c4',
    text: 'הכינו שרשרת או צמיד מחרוזים או פסטה',
    categories: [Category.CREATIVE],
    suitableAges: [AgeGroup.CHILD],
    suitableGenders: [Gender.GIRL, 'BOTH'],
    icon: Gem
  },
  {
    id: 'c5',
    text: 'בנו מגדל הכי גבוה שאתם יכולים מלגו או קוביות',
    categories: [Category.CREATIVE, Category.FUN],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    icon: Blocks
  },
  {
    id: 'c6',
    text: 'משחק מחבואים ברחבי הבית',
    categories: [Category.FUN, Category.PHYSICAL, Category.SOCIAL],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    icon: EyeOff
  },
  {
    id: 'c7',
    text: 'הכינו הר געש מסודה לשתייה וחומץ בכיור',
    categories: [Category.CREATIVE, Category.FUN],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN],
    suitableGenders: ['BOTH'],
    description: 'שימו סודה לשתייה בכוס, הוסיפו צבע מאכל, ושפכו חומץ פנימה!',
    icon: FlaskConical
  },
  {
    id: 'c8',
    text: 'משחק פסלים מוזיקליים',
    categories: [Category.FUN, Category.PHYSICAL, Category.MUSIC, Category.SOCIAL],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    description: 'רקדו לצלילי המוזיקה וקפאו במקום כשהיא נעצרת.',
    icon: Music
  },

  // --- TEEN & YOUNG ADULT ACTIVITIES ---
  {
    id: 't1',
    text: 'למדו לערוך סרטון קצר בטלפון',
    categories: [Category.CREATIVE, Category.DIGITAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG],
    suitableGenders: ['BOTH'],
    icon: Video
  },
  {
    id: 't2',
    text: 'סדרו מחדש את החדר שלכם',
    categories: [Category.CHORE, Category.CREATIVE],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG],
    suitableGenders: ['BOTH'],
    description: 'להזיז את המיטה, לסדר את המדפים ולזרוק דברים ישנים.',
    icon: Bed
  },
  {
    id: 't3',
    text: 'אימון כושר ביתי של 20 דקות',
    categories: [Category.PHYSICAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'שכיבות סמיכה, כפיפות בטן, וג׳אמפינג ג׳קס.',
    icon: Dumbbell
  },
  {
    id: 't4',
    text: 'כתבו מכתב לעצמכם בעוד 5 שנים',
    categories: [Category.INTELLECTUAL, Category.CREATIVE],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG],
    suitableGenders: ['BOTH'],
    icon: Mail
  },

  // --- ADULT & SENIOR ACTIVITIES ---
  {
    id: 'a1',
    text: 'נקו את תיבת המייל שלכם ומחקו דברים מיותרים',
    categories: [Category.CHORE, Category.DIGITAL],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'זה משעמם, אבל מספק מאוד אחר כך.',
    icon: Trash2
  },
  {
    id: 'a2',
    text: 'נסו לבשל מתכון חדש שמעולם לא ניסיתם',
    categories: [Category.CREATIVE, Category.FUN, Category.COOKING],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    icon: ChefHat
  },
  {
    id: 'a3',
    text: 'עברו על אלבומי תמונות ישנים וסדרו אותם',
    categories: [Category.FUN, Category.CHORE, Category.SOCIAL],
    suitableAges: [AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    icon: Image
  },
  {
    id: 'a4',
    text: 'האזינו לפודקאסט בנושא שאתם לא מבינים בו כלום',
    categories: [Category.INTELLECTUAL, Category.DIGITAL],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    icon: Headphones
  },

  // --- PREVIOUSLY ADDED ---
  {
    id: 'n1',
    text: 'טניס בלונים',
    categories: [Category.FUN, Category.PHYSICAL, Category.SOCIAL],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD, AgeGroup.TEEN],
    suitableGenders: ['BOTH'],
    description: 'נפחו בלון ונסו לשמור אותו באוויר מבלי שיגע ברצפה.',
    icon: Wind
  },
  {
    id: 'n2',
    text: 'למדו קסם קלפים פשוט',
    categories: [Category.INTELLECTUAL, Category.FUN, Category.SOCIAL],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'חפשו מדריך ביוטיוב והפתיעו את המשפחה.',
    icon: Spade
  },
  {
    id: 'n3',
    text: 'תכננו את הארוחות לשבוע הקרוב',
    categories: [Category.CHORE, Category.INTELLECTUAL, Category.COOKING],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'חסכו זמן וכסף בעזרת תכנון מוקדם.',
    icon: Calendar
  },
  {
    id: 'n4',
    text: 'תחרות מבטים',
    categories: [Category.FUN, Category.SOCIAL],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'הראשון שמצמץ מפסיד!',
    icon: Eye
  },
  {
    id: 'n5',
    text: 'אתגר איזון ספרים',
    categories: [Category.PHYSICAL, Category.FUN],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'נסו ללכת בקו ישר עם ספר על הראש מבלי שיפול.',
    icon: BookOpen
  },
  {
    id: 'n6',
    text: 'הכינו משחק קופסה משלכם',
    categories: [Category.CREATIVE, Category.FUN, Category.SOCIAL],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG],
    suitableGenders: ['BOTH'],
    description: 'ציירו לוח, הכינו חיילים מפקקים והמציאו חוקים.',
    icon: Dice5
  },
  {
    id: 'n7',
    text: 'למדו ריקוד חדש מיוטיוב או טיקטוק',
    categories: [Category.PHYSICAL, Category.FUN, Category.MUSIC, Category.DIGITAL],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'זה מצחיק, בריא ומעביר את הזמן בכיף.',
    icon: Music2
  },
  {
    id: 'n8',
    text: 'סדרו את ספריית הספרים לפי צבעים',
    categories: [Category.CHORE, Category.CREATIVE],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'זה נראה נהדר ונותן תחושה של סדר חדש בעיניים.',
    icon: Library
  },
  {
    id: 'n9',
    text: 'הקשיבו לאלבום מוזיקה מלא מההתחלה ועד הסוף',
    categories: [Category.INTELLECTUAL, Category.FUN, Category.MUSIC],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'בלי לדלג על שירים, פשוט להקשיב ליצירה שלמה.',
    icon: Disc
  },
  {
    id: 'n10',
    text: 'כתבו רשימת משאלות (Bucket List) לשנה הקרובה',
    categories: [Category.INTELLECTUAL, Category.CREATIVE],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'מקומות שתרצו לבקר, דברים שתרצו ללמוד וחוויות שתרצו לחוות.',
    icon: ListTodo
  },

  // --- NEW ADDITIONS (Adults & Seniors - Intellectual & Chore) ---
  {
    id: 'n11',
    text: 'עברו על ארון התרופות וזרקו תרופות שפג תוקפן',
    categories: [Category.CHORE],
    suitableAges: [AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'זה חשוב לבטיחות ומפנה המון מקום.',
    icon: Pill
  },
  {
    id: 'n12',
    text: 'סדרו את "מגירת הבלגן" שכולם זורקים אליה הכל',
    categories: [Category.CHORE],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'המגירה הזו במטבח או בכניסה לבית שצריכה הצלה.',
    icon: Archive
  },
  {
    id: 'n13',
    text: 'למדו איך אומרים "שלום" ו"תודה" ב-3 שפות חדשות',
    categories: [Category.INTELLECTUAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'תרגיל מצוין למוח וכיף לדעת.',
    icon: Languages
  },
  {
    id: 'n14',
    text: 'כתבו 3 זיכרונות ילדות משמעותיים במחברת',
    categories: [Category.INTELLECTUAL, Category.CREATIVE],
    suitableAges: [AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'שימור זיכרונות זה דבר יקר ערך, לעצמכם ולמשפחה.',
    icon: BookHeart
  },
  {
    id: 'n15',
    text: 'קראו ערך אקראי בוויקיפדיה ולמדו נושא חדש',
    categories: [Category.INTELLECTUAL, Category.DIGITAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'הרחיבו אופקים בנושא שלא חשבתם עליו מעולם.',
    icon: Globe
  },
  {
    id: 'n16',
    text: 'מיינו את התמונות בטלפון ומחקו צילומי מסך ישנים',
    categories: [Category.CHORE, Category.DIGITAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'מפנה מקום בזיכרון ועושה סדר בראש.',
    icon: Smartphone
  },
  {
    id: 'n17',
    text: 'פתרו תשבץ, סודוקו או חידת היגיון',
    categories: [Category.INTELLECTUAL],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'שמירה על כושר מנטלי היא חשובה לא פחות מכושר גופני.',
    icon: Grid3X3
  },
  
  // --- EVEN MORE NEW ADDITIONS ---
  {
    id: 'n18',
    text: 'למדו לשחק סוליטר או משחק קלפים חדש',
    categories: [Category.INTELLECTUAL, Category.FUN, Category.SOCIAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'זה הזמן לשלוף חפיסת קלפים ולהפעיל את הראש.',
    icon: Club
  },
  {
    id: 'n19',
    text: 'צאו לסיבוב צילום בשכונה - חפשו דברים יפים לצלם',
    categories: [Category.CREATIVE, Category.PHYSICAL, Category.OUTDOORS],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'נסו למצוא זווית חדשה ומעניינת למקומות מוכרים.',
    icon: Camera
  },
  {
    id: 'n20',
    text: 'הכינו בובות גרב מגרביים ישנים וכפתורים',
    categories: [Category.CREATIVE, Category.FUN],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD],
    suitableGenders: ['BOTH'],
    description: 'אפשר להוסיף צמר לשיער ולהציג הצגה קטנה.',
    icon: Smile
  },
  {
    id: 'n21',
    text: 'עשו סדר במקרר וזרקו מוצרים פגי תוקף',
    categories: [Category.CHORE, Category.COOKING],
    suitableAges: [AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'הזדמנות טובה לנקות מדפים ולעשות מקום לדברים טעימים.',
    icon: Snowflake
  },
  {
    id: 'n22',
    text: 'ערכו פיקניק בסלון עם שמיכה וחטיפים',
    categories: [Category.FUN, Category.SOCIAL, Category.COOKING],
    suitableAges: [AgeGroup.TODDLER, AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'מי אמר שחייבים לצאת מהבית כדי ליהנות מפיקניק?',
    icon: Utensils
  },
  
  // --- LATEST ADDITIONS ---
  {
    id: 'n23',
    text: 'שתלו גרעין של פרי או ירק בעציץ קטן',
    categories: [Category.OUTDOORS, Category.CREATIVE],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'השקו אותו כל יום וצפו בו גדל לאט לאט.',
    icon: Sprout
  },
  {
    id: 'n24',
    text: 'תרגול נשימות או מדיטציה של 5 דקות',
    categories: [Category.PHYSICAL, Category.INTELLECTUAL],
    suitableAges: [AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'עצמו עיניים, קחו אוויר עמוק ונסו לנקות את הראש.',
    icon: Flower
  },
  {
    id: 'n25',
    text: 'למדו לקפל אוריגמי של עגור או סירה',
    categories: [Category.CREATIVE, Category.INTELLECTUAL],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'כל מה שצריך זה דף נייר מרובע וקצת סבלנות.',
    icon: Send
  },
  {
    id: 'n26',
    text: 'ערב קריוקי ביתי עם שירים ביוטיוב',
    categories: [Category.MUSIC, Category.FUN, Category.SOCIAL],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.YOUNG, AgeGroup.ADULT],
    suitableGenders: ['BOTH'],
    description: 'בחרו את השירים האהובים עליכם ושירו בקולי קולות.',
    icon: Mic
  },
  {
    id: 'n27',
    text: 'הכינו קולאז׳ מגזירות של עיתונים ישנים',
    categories: [Category.CREATIVE, Category.FUN],
    suitableAges: [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.ADULT, AgeGroup.SENIOR],
    suitableGenders: ['BOTH'],
    description: 'גזרו תמונות וכותרות מעניינות והדביקו אותן ליצירה חדשה.',
    icon: Scissors
  }
];