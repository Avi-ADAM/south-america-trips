/**
 * תכנית הטיול לאקוודור — מבוססת על הצעת הספק (GreenGo Travel, Itinerary TC-CS3BKUAB).
 * בכוונה אין כאן מחירים: המחיר מוגדר רק ב-src/lib/config.ts.
 */

export type RegionId = 'andes' | 'amazon' | 'galapagos' | 'coast';

export interface Region {
	id: RegionId;
	name: string;
	short: string;
	color: string;
}

export const regions: Record<RegionId, Region> = {
	andes: { id: 'andes', name: 'קיטו והאנדים', short: 'האנדים', color: '#f2b84b' },
	amazon: { id: 'amazon', name: 'האמזונס', short: 'אמזונס', color: '#4ade80' },
	galapagos: { id: 'galapagos', name: 'איי גלאפגוס', short: 'גלאפגוס', color: '#2ec4d6' },
	coast: { id: 'coast', name: 'גואיאקיל והחוף', short: 'גואיאקיל', color: '#ff8a65' }
};

export interface ScheduleItem {
	time?: string;
	title: string;
	text?: string;
	kind?: 'tour' | 'flight' | 'transfer' | 'hotel' | 'free' | 'optional';
}

export interface Day {
	n: number;
	/** ISO date */
	date: string;
	weekday: string;
	region: RegionId;
	/** איפה אנחנו */
	where: string;
	title: string;
	/** תקציר קצר למצגת */
	summary: string;
	image: string;
	gallery?: string[];
	schedule: ScheduleItem[];
	/** המלון של הלילה (או "—" ביום האחרון) */
	hotel?: { name: string; text?: string };
	shabbat?: boolean;
	/** תכנית שעדיין לא התקבלה מהספק (לודג' לה סלבה) */
	pending?: boolean;
}

const img = (name: string) => `/img/trip/${name}.jpg`;
const hero = (name: string) => `/img/hero/${name}.jpg`;

export const trip = {
	slug: 'ecuador-2027',
	title: 'אקוודור · אמזונס · גלאפגוס',
	/** הכותרת המרכזית במצגת */
	headline: 'אקוודור · אמזונס · איי גלאפגוס ופרו',
	tagline: 'חוויה של פעם בחיים',
	subtitle: '20 ימים בין הרי געש, ג׳ונגל אמזוני ואיים שבהם הטבע עדיין מנהל את העניינים',
	start: '2027-06-22',
	end: '2027-07-11',
	dateLabel: '22.6 – 11.7.2027',
	days: 20,
	nights: 19,
	heroImages: [hero('galapagos'), hero('quito'), hero('amazon'), hero('cotopaxi'), hero('quilotoa')]
};

export const worlds = [
	{
		id: 'andes' as RegionId,
		title: 'אקוודור',
		kicker: 'על קו המשווה',
		image: hero('cotopaxi'),
		text: 'מדינה קטנה בצפון-מערב דרום אמריקה, שוכנת בדיוק על קו המשווה בין קולומביה לפרו. רכס האנדים חוצה אותה מצפון לדרום, ובו כמה מהרי הגעש הפעילים הגבוהים בעולם — ובראשם הקוטופקסי המושלג. העיר העתיקה של קיטו, הבירה, הוכרזה כאתר מורשת עולמית של אונסק״ו.',
		facts: ['קיטו — בירה בגובה 2,850 מ׳', 'קוטופקסי — 5,897 מ׳', 'שווקים אינדיאניים צבעוניים']
	},
	{
		id: 'amazon' as RegionId,
		title: 'האמזונס',
		kicker: 'שליש מהמדינה — ג׳ונגל',
		image: hero('amazon'),
		text: 'יער הגשם האמזוני של אקוודור משתרע על כשליש משטח המדינה, מזרחית לרכס האנדים. זהו אחד המקומות העשירים ביותר בעולם במגוון ביולוגי: יותר מ-300 מיני יונקים, 800 מיני דגים ו-350 מיני זוחלים. נשהה שלושה לילות בלודג׳ אקולוגי בלב הג׳ונגל.',
		facts: ['300+ מיני יונקים', '800 מיני דגים', '3 לילות בלודג׳ La Selva']
	},
	{
		id: 'galapagos' as RegionId,
		title: 'איי גלאפגוס',
		kicker: 'המעבדה של דרווין',
		image: hero('galapagos'),
		text: 'ארכיפלג של איים וולקניים באוקיינוס השקט, כ-906 ק״מ מערבית ליבשת. האיים מפורסמים בזכות מספר עצום של מינים אנדמיים — צבי ענק, איגואנות ימיות, כחולי-רגל ואריות ים — ובזכות צ׳ארלס דרווין, שתצפיותיו כאן הולידו את תורת האבולוציה. כל האיים הם פארק לאומי ושמורה ימית.',
		facts: ['906 ק״מ מהיבשת', 'אתר מורשת עולמית', 'שנירקול עם אריות ים']
	}
];

export const days: Day[] = [
	{
		n: 1,
		date: '2027-06-22',
		weekday: 'שלישי',
		region: 'andes',
		where: 'קיטו · אוטבלו',
		title: 'נחיתה באקוודור ושוק אוטבלו',
		summary: 'נוחתים באקוודור ויוצאים צפונה לאוטבלו — השוק האינדיאני המפורסם, מפל פגוצ׳ה וסדנת אריגה מקומית.',
		image: hero('otavalo'),
		gallery: [img('otavalo-llama'), img('otavalo-dance')],
		schedule: [
			{ title: 'טיסה בינלאומית לאקוודור', text: 'כרטיסי הטיסה הבינלאומית נרכשים ישירות על ידי המטיילים.', kind: 'flight' },
			{ time: '08:00', title: 'יום טיול לאוטבלו', kind: 'tour', text: 'נסיעה של כשעתיים צפונה. עצירה אופציונלית בקאיאמבה לטעום ביסקוטים וגבינה מקומית. זמן חופשי בשוק אוטבלו — מלאכות יד, אריגים, תכשיטים ומזכרות. ארוחת צהריים במסעדה מקומית, הליכה קלה של רבע שעה למפל פגוצ׳ה, וביקור בבית משפחה מקומית לצפות באריגה ובבניית כלי נגינה אנדיאניים.' },
			{ time: '18:00', title: 'צ׳ק-אין במלון Hotel Quito', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Quito', text: 'מלון ארט-דקו 4 כוכבים במרכז קיטו, חדרים עם מרפסות ובריכה חיצונית המשקיפה על העמק האנדיאני.' }
	},
	{
		n: 2,
		date: '2027-06-23',
		weekday: 'רביעי',
		region: 'andes',
		where: 'הפארק הלאומי קוטופקסי',
		title: 'מרגלות הקוטופקסי',
		summary: 'יום בפארק הלאומי קוטופקסי: לגונת לימפיופונגו, טיפוס לבקתת חוסה ריבאס בגובה 4,810 מ׳ ואפשרות להגיע עד הקרחונים.',
		image: hero('cotopaxi'),
		gallery: [img('cotopaxi-2'), img('hacienda-cienega')],
		schedule: [
			{ time: '07:45', title: 'צ׳ק-אאוט מהמלון', kind: 'hotel' },
			{ time: '08:00', title: 'יום מלא בקוטופקסי', kind: 'tour', text: 'כשעתיים נסיעה לפארק הלאומי. הליכה קצרה סביב לגונת לימפיופונגו ונקודת התצפית. טיפוס בקצב אישי מגובה 4,550 מ׳ לבקתת חוסה ריבאס (4,810 מ׳) — כ-45–60 דקות. אפשרות להמשיך 30–40 דקות עד שולי הקרחונים.' },
			{ time: '17:00', title: 'צ׳ק-אין בהסיינדה לה סיינגה', kind: 'hotel' }
		],
		hotel: { name: 'Hacienda La Ciénega', text: 'אחוזה היסטורית למרגלות הרי האנדים ליד לטקונגה, 28 חדרים מעוצבים עם אח, מסעדה ובר עם נוף לגן.' }
	},
	{
		n: 3,
		date: '2027-06-24',
		weekday: 'חמישי',
		region: 'andes',
		where: 'לגונת קילוטואה',
		title: 'האגם הירוק שבלוע הר הגעש',
		summary: 'קילוטואה — לוע הר געש ברוחב 3 ק״מ ובתוכו אגם טורקיז בעומק 250 מ׳. תצפיות, הליכה ואפשרות לרדת עד שפת המים.',
		image: hero('quilotoa'),
		gallery: [img('quilotoa'), img('quilotoa-2')],
		schedule: [
			{ time: '07:45', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '08:00', title: 'יום מלא בקילוטואה', kind: 'tour', text: 'כשעה וחצי נסיעה עם עצירות בנקודות תצפית. הליכה סביב שפת הלוע בגובה 3,800 מ׳ ותצפית על האגם, שצבעו הירקרק נובע ממינרלים מומסים. אפשרות לשכור פרדה לירידה לשפת האגם. ארוחת צהריים במקום וזמן חופשי. חזרה לקיטו בשעות הערב.' },
			{ time: '18:00', title: 'צ׳ק-אין במלון Hotel Quito', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Quito' }
	},
	{
		n: 4,
		date: '2027-06-25',
		weekday: 'שישי',
		region: 'andes',
		where: 'קיטו · אמצע העולם',
		title: 'רכבל מעל העננים וקו המשווה',
		summary: 'עולים ברכבל של קיטו לגובה של כמעט 4,000 מ׳, ואחר הצהריים עומדים עם רגל אחת בכל חצי כדור במוזיאון אינטיניאן.',
		image: img('cablecar-clouds'),
		gallery: [img('cablecar'), hero('mitad'), img('intinan')],
		schedule: [
			{ time: '09:00', title: 'הרכבל של קיטו (TelefériQo)', kind: 'tour', text: 'נסיעה של 18 דקות בקרונית עם נוף פנורמי על העיר אל מורדות הר הגעש פיצ׳ינצ׳ה. תצפיות והליכות קלות. למיטיבי לכת — טיפוס אופציונלי לפסגת רוקו פיצ׳ינצ׳ה (כשעתיים לכל כיוון).' },
			{ time: '13:00', title: 'מוזיאון אינטיניאן — אמצע העולם', kind: 'tour', text: 'מוזיאון אינטראקטיבי על קו המשווה: בקתות בנות מאה שנה, ניסויים בתופעות פיזיקליות של קו המשווה ומסלול השמש בתפיסת העולם של העמים הקדומים.' },
			{ title: 'ערב שבת בקיטו', kind: 'free' }
		],
		hotel: { name: 'Hotel Quito' }
	},
	{
		n: 5,
		date: '2027-06-26',
		weekday: 'שבת',
		region: 'andes',
		where: 'קיטו',
		title: 'שבת בקיטו',
		summary: 'יום חופשי ללא פעילויות מתוכננות — מנוחה, טיול רגלי בעיר העתיקה או בריכה עם נוף לעמק.',
		image: hero('quito'),
		gallery: [img('quito-sanfrancisco'), img('quito-view')],
		schedule: [{ title: 'יום חופשי — שבת', kind: 'free', text: 'אין פעילויות מתוכננות. זמן למנוחה ולהנאה מקיטו.' }],
		hotel: { name: 'Hotel Quito' },
		shabbat: true
	},
	{
		n: 6,
		date: '2027-06-27',
		weekday: 'ראשון',
		region: 'andes',
		where: 'באניוס',
		title: 'בדרך לשער האמזונס',
		summary: 'נוסעים דרומה לבאניוס — עיירת מעיינות חמים למרגלות הר הגעש הפעיל טונגוראואה. אחר הצהריים: ספא ובריכה.',
		image: img('sangay'),
		gallery: [img('banos-church')],
		schedule: [
			{ time: '08:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '08:30', title: 'העברה לבאניוס', kind: 'transfer', text: 'נסיעה של כארבע שעות לאורך "שדרת הרי הגעש".' },
			{ time: '14:00', title: 'צ׳ק-אין במלון Sangay Spa', kind: 'hotel', text: 'דקות הליכה מהמעיינות החמים Termas de la Virgen. ספא, בריכה חיצונית וזמן חופשי בעיירה.' }
		],
		hotel: { name: 'Sangay Spa Hotel', text: 'מלון ספא במרכז באניוס, ליד המעיינות החמים וכנסיית הבתולה, עם ספא מלא ובריכה חיצונית.' }
	},
	{
		n: 7,
		date: '2027-06-28',
		weekday: 'שני',
		region: 'andes',
		where: 'דרך המפלים · קיטו',
		title: 'דרך המפלים ופאיון דל דיאבלו',
		summary: '60 מפלים בדרך מבאניוס לפויו: אגויאן, מנטו דה לה נוביה, טרביטה מעל הקניון והמפל העוצמתי "סיר השטן".',
		image: hero('pailon'),
		gallery: [img('banos-church'), img('wyndham')],
		schedule: [
			{ time: '07:45', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '08:00', title: 'דרך המפלים, טרביטה ופאיון דל דיאבלו', kind: 'tour', text: 'מפל אגויאן — מהגבוהים באקוודור, נסיעה במנהרות שמפלים זורמים עליהן, מפל "צעיף הכלה" (Manto de la Novia) עם טרביטה — סל רכבל מעל הקניון — וגשר תלוי. ושיא היום: פאיון דל דיאבלו, מפל אדיר שנופל לתוך "סיר" סלעי. בדרך: מפלי אינס מריה, בסקון, צ׳מנה ואולבה.' },
			{ time: '18:00', title: 'צ׳ק-אין בווינדהם שדה התעופה קיטו', kind: 'hotel' }
		],
		hotel: { name: 'Wyndham Quito Airport', text: 'מלון 4 כוכבים צמוד לשדה התעופה — מוכנים לטיסה המוקדמת לאמזונס.' }
	},
	{
		n: 8,
		date: '2027-06-29',
		weekday: 'שלישי',
		region: 'amazon',
		where: 'קוקה · לה סלבה',
		title: 'טסים אל לב הג׳ונגל',
		summary: 'טיסה קצרה מקיטו לקוקה, ומשם ללודג׳ האקולוגי La Selva — שלושה לילות בלב יער הגשם האמזוני.',
		image: hero('amazon-river'),
		gallery: [img('laselva'), img('laselva-room'), img('macaw')],
		schedule: [
			{ time: '07:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '09:29', title: 'טיסה קיטו ← קוקה (LATAM)', kind: 'flight', text: 'טיסה של 40 דקות לשדה התעופה פרנסיסקו דה אוריאנה.' },
			{ time: '12:00', title: 'הגעה ללודג׳ La Selva', kind: 'tour', text: 'תכנית הפעילויות המלאה בלודג׳ תתעדכן בקרוב.' }
		],
		hotel: { name: 'La Selva Eco Lodge', text: 'סוויטה Superior/Scenic · חבילת 4 ימים / 3 לילות.' },
		pending: true
	},
	{
		n: 9,
		date: '2027-06-30',
		weekday: 'רביעי',
		region: 'amazon',
		where: 'לודג׳ La Selva',
		title: 'יום בג׳ונגל',
		summary: 'יום מלא באמזונס. התכנית המפורטת של הלודג׳ תתעדכן בקרוב.',
		image: hero('amazon'),
		schedule: [{ title: 'פעילויות בלודג׳ La Selva', kind: 'tour', text: 'התכנית המפורטת תתעדכן בקרוב.' }],
		hotel: { name: 'La Selva Eco Lodge' },
		pending: true
	},
	{
		n: 10,
		date: '2027-07-01',
		weekday: 'חמישי',
		region: 'amazon',
		where: 'לודג׳ La Selva',
		title: 'עוד יום בג׳ונגל',
		summary: 'יום נוסף באמזונס. התכנית המפורטת של הלודג׳ תתעדכן בקרוב.',
		image: hero('amazon-mist'),
		schedule: [{ title: 'פעילויות בלודג׳ La Selva', kind: 'tour', text: 'התכנית המפורטת תתעדכן בקרוב.' }],
		hotel: { name: 'La Selva Eco Lodge' },
		pending: true
	},
	{
		n: 11,
		date: '2027-07-02',
		weekday: 'שישי',
		region: 'andes',
		where: 'קוקה · קיטו',
		title: 'חוזרים לקיטו',
		summary: 'נפרדים מהג׳ונגל, טסים חזרה לקיטו ומתארגנים לשבת.',
		image: img('hotel-quito'),
		schedule: [
			{ time: '09:00', title: 'יציאה מהלודג׳', kind: 'transfer' },
			{ time: '10:49', title: 'טיסה קוקה ← קיטו (LATAM)', kind: 'flight', text: 'טיסה של 38 דקות.' },
			{ time: '12:00', title: 'העברה מהשדה למלון', kind: 'transfer' },
			{ title: 'ערב שבת בקיטו', kind: 'free' }
		],
		hotel: { name: 'Hotel Quito' }
	},
	{
		n: 12,
		date: '2027-07-03',
		weekday: 'שבת',
		region: 'andes',
		where: 'קיטו',
		title: 'שבת בקיטו',
		summary: 'יום חופשי ומנוחה לפני הטיסה לגלאפגוס.',
		image: img('quito-view'),
		schedule: [{ title: 'יום חופשי — שבת', kind: 'free', text: 'אין פעילויות מתוכננות.' }],
		hotel: { name: 'Hotel Quito' },
		shabbat: true
	},
	{
		n: 13,
		date: '2027-07-04',
		weekday: 'ראשון',
		region: 'galapagos',
		where: 'סן קריסטובל',
		title: 'נוחתים בגלאפגוס',
		summary: 'טסים לאי סן קריסטובל: חוות צבי הענק, אגם המכתש אל חונקו והחוף הלבן של פוארטו צ׳ינו עם אריות ים וכחולי-רגל.',
		image: hero('tortoise'),
		gallery: [hero('booby'), img('galapaguera'), img('casa-opuntia')],
		schedule: [
			{ time: '05:00', title: 'צ׳ק-אאוט והעברה לשדה', kind: 'transfer' },
			{ time: '07:38', title: 'טיסה קיטו ← סן קריסטובל (דרך גואיאקיל)', kind: 'flight' },
			{ time: '10:30', title: 'העברה מהשדה למלון', kind: 'transfer' },
			{ time: '14:00', title: 'גלאפגוארה, אל חונקו ופוארטו צ׳ינו', kind: 'tour', text: 'הגלאפגוארה — שטח שבו צבי ענק מסתובבים חופשי, ומרכז הרבייה שבו בוקעים הצבים הצעירים. לגונת אל חונקו — אגם מים מתוקים בתוך מכתש בגובה 700 מ׳, המקום האהוב על ציפורי הפריגטה. ולסיום: פוארטו צ׳ינו, חוף חול לבן וגלים בטורקיז, עם אריות ים וכחולי-רגל.' },
			{ time: '17:00', title: 'צ׳ק-אין בקאסה אופונטיה', kind: 'hotel' }
		],
		hotel: { name: 'Casa Opuntia', text: 'על טיילת החוף, מטרים מחוף פלאיה דה אורו, עם מסעדת גן המשקיפה על המפרץ.' }
	},
	{
		n: 14,
		date: '2027-07-05',
		weekday: 'שני',
		region: 'galapagos',
		where: 'סן קריסטובל · סנטה קרוז',
		title: 'גבעת הפריגטות ומעבר לסנטה קרוז',
		summary: 'מרכז המבקרים, גבעת הפריגטות — שם נחת דרווין לראשונה — ושיט במעבורת לאי סנטה קרוז.',
		image: hero('galapagos'),
		gallery: [img('tijeretas'), img('interpretation'), img('fiesta')],
		schedule: [
			{ time: '10:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '11:00', title: 'מרכז המבקרים (Interpretation Center)', kind: 'tour', text: 'ההיסטוריה הטבעית והאנושית של האיים — מהמוצא הוולקני ועד מאבקי השימור של היום.' },
			{ time: '12:00', title: 'גבעת הפריגטות (Cerro Tijeretas)', kind: 'tour', text: 'תצפיות על ציפורי הפריגטה, על הסלע "האריה הישן" ועל המפרץ, לצד פסל של דרווין — זה היה האי הראשון שבו ביקר.' },
			{ time: '15:00', title: 'מעבורת סן קריסטובל ← סנטה קרוז', kind: 'transfer', text: 'שיט של כשעתיים.' },
			{ time: '17:10', title: 'צ׳ק-אין במלון פייסטה, פוארטו איורה', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Fiesta', text: 'בפוארטו איורה, קרוב לחוף, לתחנת דרווין ולמפרץ טורטוגה. בריכה חיצונית ומרפסת.' }
	},
	{
		n: 15,
		date: '2027-07-06',
		weekday: 'שלישי',
		region: 'galapagos',
		where: 'סנטה קרוז',
		title: 'שנירקול עם אריות ים',
		summary: 'שיט במפרץ: שחייה עם אריות ים וצבי ים, תעלת הכרישים, לאס גרייטאס, ואחר הצהריים — חוף טורטוגה ביי.',
		image: hero('sealions'),
		gallery: [hero('tortuga'), hero('iguana'), img('bay-santa-cruz')],
		schedule: [
			{ time: '08:00', title: 'סיור מפרץ (משותף)', kind: 'tour', text: 'לה לובריה — שנירקול עם אריות ים, צבי ים ודגי שונית. תעלת הכרישים, תעלת האהבה, חוף הכלבים, מכרות המלח ולאס גרייטאס — ערוץ מים בין צוקים. סיום בחוף פונטה אסטרדה. ציוד שנירקול כלול.' },
			{ time: '14:00', title: 'חוף טורטוגה ביי (אופציונלי, עצמאי)', kind: 'optional', text: 'חוף חול לבן כ-2 ק״מ מפוארטו איורה, אתר הטלה של צבי ים ירוקים. שחייה, הליכה ותצפית על שקנאים וכרישים קטנים.' }
		],
		hotel: { name: 'Hotel Fiesta' }
	},
	{
		n: 16,
		date: '2027-07-07',
		weekday: 'רביעי',
		region: 'coast',
		where: 'סנטה קרוז · גואיאקיל',
		title: 'תחנת דרווין וטיסה לגואיאקיל',
		summary: 'ביקור בבוקר בתחנת המחקר על שם צ׳ארלס דרווין, טיסה לגואיאקיל ומעבר לחוף הפסיפי.',
		image: img('darwin-station'),
		gallery: [img('cedros')],
		schedule: [
			{ time: '07:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '07:15', title: 'תחנת המחקר צ׳ארלס דרווין', kind: 'tour', text: 'הליכה קלה בשבילים מסומנים, מתאימה לכל הגילאים. כ-2–3 שעות.' },
			{ time: '09:15', title: 'העברה פרטית לשדה התעופה בלטרה', kind: 'transfer' },
			{ time: '12:00', title: 'טיסה בלטרה ← גואיאקיל (LATAM)', kind: 'flight' },
			{ time: '16:00', title: 'צ׳ק-אין בסדרוס אין', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Cedros Inn', text: 'מלון בוטיק מודרני בלב גואיאקיל, 24 חדרים, בריכה חיצונית, גן ומרפסת שקטה.' }
	},
	{
		n: 17,
		date: '2027-07-08',
		weekday: 'חמישי',
		region: 'coast',
		where: 'חוות קקאו',
		title: 'מהפרי לשוקולד',
		summary: 'יום בחוות קקאו: מטעים, קטיף, תסיסה וייבוש — ובסוף מכינים שוקולד בעצמנו. ארוחת צהריים מסורתית בחווה.',
		image: img('cacao'),
		schedule: [
			{ time: '08:00', title: 'סיור בחוות קקאו', kind: 'tour', text: 'קבלת פנים בהסיינדה וסיור במטע הקקאו, בין עצי מנגו ופפאיה. נראה את הקטיף, התסיסה והייבוש של פולי הקקאו, ובסוף נכין שוקולד. ארוחת צהריים מסורתית בבית החווה. כ-5 שעות.' }
		],
		hotel: { name: 'Hotel Cedros Inn' }
	},
	{
		n: 18,
		date: '2027-07-09',
		weekday: 'שישי',
		region: 'coast',
		where: 'גואיאקיל',
		title: 'גואיאקיל והפארק ההיסטורי',
		summary: 'פארק האיגואנות, הטיילת על נהר גואיאס, שכונת לאס פניאס הצבעונית — ופארק היסטורי עם מנגרובים וקופים.',
		image: hero('guayaquil'),
		gallery: [img('guayaquil')],
		schedule: [
			{ time: '08:00', title: 'סיור עירוני + הפארק ההיסטורי', kind: 'tour', text: 'כיכר המנהל וארמון העירייה, פארק סמינריו ("פארק האיגואנות") וקתדרלת סן פדרו, טיילת סימון בוליבר עם ארמון הקריסטל והרוטונדה, ושכונת לאס פניאס על גבעת סנטה אנה. בפארק ההיסטורי: שבילי עץ מעל המנגרובים עם תנינים, קופים ועצלנים, בתי מורשת מראשית המאה ה-20, ומטעי קקאו, בננה וקפה. כ-5 שעות.' },
			{ title: 'ערב שבת בגואיאקיל', kind: 'free' }
		],
		hotel: { name: 'Hotel Cedros Inn' }
	},
	{
		n: 19,
		date: '2027-07-10',
		weekday: 'שבת',
		region: 'coast',
		where: 'גואיאקיל',
		title: 'שבת בגואיאקיל',
		summary: 'יום חופשי. אפשרות להליכה לפארק ירושלים — אנדרטה עם מנורה ודגם של ירושלים בימי בית שני.',
		image: img('jerusalem-park'),
		schedule: [
			{ title: 'יום חופשי — שבת', kind: 'free' },
			{ time: '08:00', title: 'פארק ירושלים העירוני (אופציונלי, עצמאי)', kind: 'optional', text: 'פארק בשכונת אורדסה שהוקם ביוזמת הקונסול הכבוד של ישראל. במרכזו אנדרטה של 18 לוחות ברונזה המספרים את סיפורה של ירושלים, ובראשה העתק בגודל מלא של מנורת הכנסת, לצד דגם של ירושלים בקנה מידה 1:150.' }
		],
		hotel: { name: 'Hotel Cedros Inn' },
		shabbat: true
	},
	{
		n: 20,
		date: '2027-07-11',
		weekday: 'ראשון',
		region: 'coast',
		where: 'גואיאקיל',
		title: 'להתראות אקוודור',
		summary: 'צ׳ק-אאוט, העברה לשדה התעופה וטיסה הביתה — עם תיק מלא בזיכרונות.',
		image: img('arrival'),
		schedule: [
			{ time: '10:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '10:30', title: 'העברה פרטית לשדה התעופה', kind: 'transfer' },
			{ title: 'טיסה בינלאומית הביתה', kind: 'flight', text: 'כרטיסי הטיסה הבינלאומית נרכשים ישירות על ידי המטיילים.' }
		]
	}
];

export const stays = [
	{ nights: 1, name: 'Hotel Quito', where: 'קיטו' },
	{ nights: 1, name: 'Hacienda La Ciénega', where: 'לטקונגה' },
	{ nights: 3, name: 'Hotel Quito', where: 'קיטו' },
	{ nights: 1, name: 'Sangay Spa Hotel', where: 'באניוס' },
	{ nights: 1, name: 'Wyndham Quito Airport', where: 'קיטו' },
	{ nights: 3, name: 'La Selva Eco Lodge', where: 'אמזונס' },
	{ nights: 2, name: 'Hotel Quito', where: 'קיטו' },
	{ nights: 1, name: 'Casa Opuntia', where: 'סן קריסטובל' },
	{ nights: 2, name: 'Hotel Fiesta', where: 'סנטה קרוז' },
	{ nights: 4, name: 'Hotel Cedros Inn', where: 'גואיאקיל' }
];

export const included = [
	'19 לילות לינה במלונות ובלודג׳, בחדרים זוגיים',
	'ארוחת בוקר אחת בכל יום',
	'כרטיס מעבר לגלאפגוס (TCT) בעלות 20$',
	'3 לילות בלודג׳ האקולוגי La Selva באמזונס (סוויטה Superior/Scenic)',
	'4 טיסות פנים: קיטו–קוקה, קוקה–קיטו, קיטו–סן קריסטובל, בלטרה–גואיאקיל',
	'מעבורת בין האיים סן קריסטובל – סנטה קרוז',
	'כל ההעברות בין שדות התעופה, המלונות והסיורים',
	'סיורים עם מדריך מוסמך: אוטבלו, קוטופקסי, קילוטואה, הרכבל של קיטו, מוזיאון אינטיניאן, דרך המפלים',
	'בגלאפגוס: גלאפגוארה, אל חונקו ופוארטו צ׳ינו, מרכז המבקרים, גבעת הפריגטות, תחנת דרווין',
	'סיור מפרץ בסנטה קרוז כולל ציוד שנירקול',
	'סיור בחוות קקאו כולל ארוחת צהריים',
	'סיור עירוני בגואיאקיל כולל כניסה לפארק ההיסטורי'
];

export const notIncluded = [
	'טיסות בינלאומיות לאקוודור וממנה',
	'ארוחות צהריים וערב, למעט המצוין בתכנית',
	'דמי כניסה באתרים מסוימים (למשל תרומה במפל פגוצ׳ה, כרטיס לרכבל קיטו)',
	'אגרת כניסה לאיי גלאפגוס (200$) — כל מטיילת משלמת באופן עצמאי',
	'ארוחות בבית חב״ד',
	'ביטוח נסיעות',
	'טיפים, משקאות והוצאות אישיות',
	'פעילויות אופציונליות ועצמאיות (חוף טורטוגה ביי, פארק ירושלים, השכרת פרדה בקילוטואה)'
];

export const stats = [
	{ value: 20, label: 'ימים' },
	{ value: 19, label: 'לילות' },
	{ value: 4, label: 'טיסות פנים' },
	{ value: 3, label: 'עולמות' }
];

export const mapPoints = [
	{ id: 'otavalo', name: 'אוטבלו', lat: 0.234, lon: -78.262 },
	{ id: 'quito', name: 'קיטו', lat: -0.18, lon: -78.47 },
	{ id: 'cotopaxi', name: 'קוטופקסי', lat: -0.68, lon: -78.44 },
	{ id: 'quilotoa', name: 'קילוטואה', lat: -0.86, lon: -78.9 },
	{ id: 'banos', name: 'באניוס', lat: -1.396, lon: -78.42 },
	{ id: 'laselva', name: 'לה סלבה', lat: -0.5, lon: -76.37 },
	{ id: 'guayaquil', name: 'גואיאקיל', lat: -2.17, lon: -79.92 }
];
