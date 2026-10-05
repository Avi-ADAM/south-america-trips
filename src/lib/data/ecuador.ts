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
	andes: { id: 'andes', name: 'קיטו והאנדים', short: 'האנדים', color: '#f3e2b3' },
	amazon: { id: 'amazon', name: 'האמזונס', short: 'אמזונס', color: '#4ade80' },
	galapagos: { id: 'galapagos', name: 'איי גלאפגוס', short: 'גלאפגוס', color: '#2ec4d6' },
	coast: { id: 'coast', name: 'גואיאקיל והחוף', short: 'גואיאקיל', color: '#f3a5b5' }
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
	/** איזה חלק של התמונה להשאיר בפריים בטלפון (object-position), כשהעיקר לא במרכז */
	focus?: string;
	/** בטלפון: התמונה תופסת את החלק העליון של המסך, כדי שהטקסט לא יסתיר את העיקר שבתחתיתה */
	photoTop?: boolean;
	/** וידאו שקט בלולאה לרקע הכותרת (image משמשת כגיבוי) */
	video?: string;
	/** בטלפון: תמונה או קליפ אנכי שנראים טוב במסך גבוה, במקום image/video שנחתכים בו */
	phone?: string;
	/** בטלפון: התמונה לא ממלאת את המסך אלא מוצגת שלמה במסגרת מעל הטקסט (לתמונות רחבות או קטנות) */
	framed?: boolean;
	/** תמונות או קטעי וידאו (mp4) */
	gallery?: string[];
	schedule: ScheduleItem[];
	/** המלון של הלילה (או "—" ביום האחרון) */
	hotel?: { name: string; text?: string; image?: string };
	shabbat?: boolean;
}

export const isVideo = (src: string) => src.endsWith('.mp4');
export const posterOf = (src: string) => src.replace(/\.mp4$/, '.jpg');

const img = (name: string) => `/img/trip/${name}.jpg`;
const hero = (name: string) => `/img/hero/${name}.jpg`;
const amazon = (name: string) => `/img/amazon/${name}.jpg`;
/** תמונות שסיפקה הלקוחה */
const photo = (name: string) => `/img/client/${name}.jpg`;
/** וידאו בלולאה ('amazon/lagoon'); תמונת הפוסטר יושבת לידו באותו שם עם סיומת jpg */
const clip = (path: string) => `/video/${path}.mp4`;

export const trip = {
	slug: 'ecuador-2027',
	title: 'אקוודור · אמזונס · גלאפגוס',
	/** הכותרת המרכזית במצגת */
	headline: 'אקוודור · אמזונס · איי גלאפגוס',
	tagline: 'חוויה של פעם בחיים',
	subtitle: '20 ימים בין הרי געש, ג׳ונגל אמזוני ואיים שבהם הטבע עדיין מנהל את העניינים',
	start: '2027-06-22',
	end: '2027-07-11',
	dateLabel: '22.6.2027 – 11.7.2027',
	days: 20,
	nights: 19,
	/** בטלפון: תמונת הפתיחה הראשונה זזה (סרטון אנכי שנוצר ממנה) */
	heroVideo: clip('andes/quilotoa'),
	heroImages: [photo('quilotoa-flowers'), photo('snorkel-turtle'), amazon('squirrel-monkey'), photo('boobies'), amazon('canoe-lagoon'), hero('cotopaxi'), hero('quito')],
	/** בטלפון, תמונה אחת לכל אחת מ-heroImages: גבוהות, או רחבות שהעיקר בהן נכנס במסך צר */
	heroPhone: [
		{ src: photo('quilotoa-flowers') },
		{ src: photo('snorkel-turtle'), pos: '62% 50%' },
		{ src: amazon('squirrel-monkey'), pos: '28% 50%' },
		{ src: photo('booby-nest'), pos: '75% 50%' },
		{ src: amazon('macaws') },
		{ src: photo('cotopaxi-llamas') },
		{ src: photo('pailon-1') }
	]
};

export const worlds = [
	{
		id: 'andes' as RegionId,
		title: 'אקוודור',
		kicker: 'על קו המשווה',
		image: hero('cotopaxi'),
		focus: '70% 50%',
		phone: photo('cotopaxi-llamas'),
		text: 'מדינה קטנה בצפון-מערב דרום אמריקה, שוכנת בדיוק על קו המשווה. רכס האנדים חוצה אותה מצפון לדרום, ובו כמה מהרי הגעש הפעילים הגבוהים בעולם — ובראשם הקוטופקסי המושלג. העיר העתיקה של קיטו, הבירה, הוכרזה כאתר מורשת עולמית של אונסק״ו.',
		facts: ['קיטו — בירה בגובה 2,850 מ׳', 'קוטופקסי — 5,897 מ׳', 'שווקים אינדיאניים צבעוניים']
	},
	{
		id: 'amazon' as RegionId,
		title: 'האמזונס',
		kicker: 'שליש מהמדינה — ג׳ונגל',
		image: amazon('canoe-lagoon'),
		phone: amazon('macaws'),
		text: 'יער הגשם האמזוני של אקוודור משתרע על כשליש משטח המדינה, מזרחית לרכס האנדים. זהו אחד המקומות העשירים ביותר בעולם במגוון ביולוגי: יותר מ-300 מיני יונקים, 800 מיני דגים ו-350 מיני זוחלים. נשהה שלושה לילות בלודג׳ אקולוגי בלב הג׳ונגל.',
		facts: ['300+ מיני יונקים', '800 מיני דגים', '3 לילות בלודג׳ La Selva']
	},
	{
		id: 'galapagos' as RegionId,
		title: 'איי גלאפגוס',
		kicker: 'המעבדה של דרווין',
		image: photo('boobies'),
		/** כחול-הרגל השמאלי, מעל הטקסט */
		focus: '27% 60%',
		photoTop: true,
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
		gallery: [photo('textiles'), photo('otavalo-llama'), photo('plaza-dance'), photo('folk-dance')],
		schedule: [
			{ title: 'טיסה בינלאומית לאקוודור', text: 'כרטיסי הטיסה הבינלאומית נרכשים ישירות על ידי המטיילים.', kind: 'flight' },
			{ time: '08:00', title: 'יום טיול לאוטבלו', kind: 'tour', text: 'נסיעה של כשעתיים צפונה. עצירה אופציונלית בקאיאמבה לטעום ביסקוטים וגבינה מקומית. זמן חופשי בשוק אוטבלו — מלאכות יד, אריגים, תכשיטים ומזכרות. ארוחת צהריים במסעדה מקומית, הליכה קלה של רבע שעה למפל פגוצ׳ה, וביקור בבית משפחה מקומית לצפות באריגה ובבניית כלי נגינה אנדיאניים.' },
			{ time: '18:00', title: 'צ׳ק-אין במלון Hotel Quito', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Quito', text: 'מלון ארט-דקו 4 כוכבים במרכז קיטו, חדרים עם מרפסות ובריכה חיצונית המשקיפה על העמק האנדיאני.', image: img('hotel-quito') }
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
		focus: '70% 50%',
		phone: photo('cotopaxi-llamas'),
		gallery: [photo('cotopaxi-horses'), photo('hacienda-chapel'), photo('hacienda-door')],
		schedule: [
			{ time: '07:45', title: 'צ׳ק-אאוט מהמלון', kind: 'hotel' },
			{ time: '08:00', title: 'יום מלא בקוטופקסי', kind: 'tour', text: 'כשעתיים נסיעה לפארק הלאומי. הליכה קצרה סביב לגונת לימפיופונגו ונקודת התצפית. טיפוס בקצב אישי מגובה 4,550 מ׳ לבקתת חוסה ריבאס (4,810 מ׳) — כ-45–60 דקות. אפשרות להמשיך 30–40 דקות עד שולי הקרחונים.' },
			{ time: '17:00', title: 'צ׳ק-אין בהסיינדה לה סיינגה', kind: 'hotel' }
		],
		hotel: { name: 'Hacienda La Ciénega', text: 'אחוזה היסטורית למרגלות הרי האנדים ליד לטקונגה, 28 חדרים מעוצבים עם אח, מסעדה ובר עם נוף לגן.', image: photo('hacienda-garden') }
	},
	{
		n: 3,
		date: '2027-06-24',
		weekday: 'חמישי',
		region: 'andes',
		where: 'לגונת קילוטואה',
		title: 'האגם הירוק שבלוע הר הגעש',
		summary: 'קילוטואה — לוע הר געש ברוחב 3 ק״מ ובתוכו אגם טורקיז בעומק 250 מ׳. תצפיות, הליכה ואפשרות לרדת עד שפת המים.',
		image: photo('quilotoa-crater'),
		phone: photo('quilotoa-cliff'),
		gallery: [photo('quilotoa-flowers'), photo('quilotoa-shore'), photo('quilotoa-cliff'), photo('quilotoa-tree')],
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
		image: photo('intinan-sign'),
		phone: photo('equator-museum'),
		gallery: [img('cablecar'), photo('mitad-monument'), photo('equator-museum')],
		schedule: [
			{ time: '09:00', title: 'הרכבל של קיטו (TelefériQo)', kind: 'tour', text: 'נסיעה של 18 דקות בקרונית עם נוף פנורמי על העיר אל מורדות הר הגעש פיצ׳ינצ׳ה. תצפיות והליכות קלות. למיטיבי לכת — טיפוס אופציונלי לפסגת רוקו פיצ׳ינצ׳ה (כשעתיים לכל כיוון). כרטיס לרכבל: 8–10$, בתשלום במקום.' },
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
		focus: '47% 50%',
		gallery: [photo('folk-dance'), photo('masks-dance')],
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
		image: img('banos-church'),
		phone: photo('pailon-2'),
		schedule: [
			{ time: '08:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '08:30', title: 'העברה לבאניוס', kind: 'transfer', text: 'נסיעה של כארבע שעות לאורך "שדרת הרי הגעש".' },
			{ time: '14:00', title: 'צ׳ק-אין במלון Sangay Spa', kind: 'hotel', text: 'דקות הליכה מהמעיינות החמים Termas de la Virgen. ספא, בריכה חיצונית וזמן חופשי בעיירה.' }
		],
		hotel: { name: 'Sangay Spa Hotel', text: 'מלון ספא במרכז באניוס, ליד המעיינות החמים וכנסיית הבתולה, עם ספא מלא ובריכה חיצונית.', image: img('sangay') }
	},
	{
		n: 7,
		date: '2027-06-28',
		weekday: 'שני',
		region: 'andes',
		where: 'דרך המפלים · קיטו',
		title: 'דרך המפלים ופיילון דל דיאבלו',
		summary: '60 מפלים בדרך מבאניוס לפויו: אגויאן, מנטו דה לה נוביה, טרביטה מעל הקניון והמפל העוצמתי פיילון דל דיאבלו — "קלחת השטן".',
		image: hero('pailon'),
		phone: photo('pailon-1'),
		gallery: [photo('pailon-bridge'), photo('pailon-1'), photo('pailon-2'), photo('pailon-flower')],
		schedule: [
			{ time: '07:45', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '08:00', title: 'דרך המפלים, טרביטה ופיילון דל דיאבלו', kind: 'tour', text: 'מפל אגויאן — מהגבוהים באקוודור, נסיעה במנהרות שמפלים זורמים עליהן, מפל "צעיף הכלה" (Manto de la Novia) עם טרביטה — סל רכבל מעל הקניון — וגשר תלוי. ושיא היום: פיילון דל דיאבלו — "קלחת השטן", מפל אדיר שנופל לתוך קלחת סלעית. בדרך: מפלי אינס מריה, בסקון, צ׳מנה ואולבה.' },
			{ time: '18:00', title: 'צ׳ק-אין בווינדהם שדה התעופה קיטו', kind: 'hotel' }
		],
		hotel: { name: 'Wyndham Quito Airport', text: 'מלון 4 כוכבים צמוד לשדה התעופה — מוכנים לטיסה המוקדמת לאמזונס.', image: img('wyndham') }
	},
	{
		n: 8,
		date: '2027-06-29',
		weekday: 'שלישי',
		region: 'amazon',
		where: 'קוקה · נהר הנאפו · La Selva',
		title: 'טסים אל לב הג׳ונגל',
		summary: 'טיסה קצרה לקוקה, שעתיים בסירה במורד נהר הנאפו וקאנו חתירה שקט אל הלודג׳ — וכבר בלילה הראשון יוצאים לחפש קיימנים בלגונה.',
		image: amazon('canoe-lagoon'),
		phone: clip('amazon/ceiba'),
		video: clip('amazon/garza-cocha'),
		gallery: [clip('amazon/lagoon'), amazon('canoe-paddle'), amazon('coca')],
		schedule: [
			{ time: '07:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '09:29', title: 'טיסה קיטו ← קוקה (LATAM)', kind: 'flight', text: 'נציג של La Selva פוגש אותנו בשדה בקיטו ועוזר בצ׳ק-אין. טיסה של כ-40 דקות לפוארטו פרנסיסקו דה אוריאנה — "אל קוקה" — ומשם רכב פרטי למשרד הלודג׳ על רציף נהר הנאפו.' },
			{ title: 'שיט במורד נהר הנאפו', kind: 'transfer', text: 'כשעתיים בקאנו מנועי במורד הנאפו — תחילתה של חוויה בלתי נשכחת. ארוחת צהריים ארוזה ושתייה על הסירה.' },
			{ title: 'קאנו חתירה אל הלודג׳', kind: 'tour', text: 'מהרציף הראשי ממשיכים בקאנו חתירה שקט על פני הלגונה. את המזוודות מעביר צוות הלודג׳ — אנחנו אחראים רק לתיק היד ולמצלמה. המנהל מקבל את פנינו עם משקה מרענן, נשנושים ותדריך קצר.' },
			{ title: 'היכרות עם יער הגשם', kind: 'tour', text: 'אחרי מנוחה והתמקמות בחדרים, מדריך טבע מספר על יער הגשם הטרופי, על האמזונס ועל החיים בלודג׳ — כדי שנצא לפעילויות כבר עם הבנה של המקום המופלא שהגענו אליו.' },
			{ title: 'שביל מטפאלו צ׳רפה', kind: 'tour', text: 'הליכה קצרה בשביל הקרוי על שם עץ התאנה החונקת. עצי מהגוני בני יותר מ-400 שנה, ואור רך של אחר הצהריים מסתנן מבעד לחופה — השעה שבה חיות היום מפנות את מקומן לחיות הלילה.' },
			{ title: 'שיט לילי בלגונת גרסה קוצ׳ה', kind: 'tour', text: 'בעזרת פנס חזק של המדריכים מחפשים קיימנים, עטלפים, ינשופים ויונקי לילה. ואם השמיים בהירים — כוכבים כמו שלא ראיתם מעולם.' },
			{ title: 'ארוחת ערב בלודג׳', kind: 'free' }
		],
		hotel: { name: 'La Selva Eco Lodge', text: 'לודג׳ אקולוגי על שפת לגונת גרסה קוצ׳ה, בלב יער הגשם. סוויטה Superior/Scenic · חבילת 4 ימים / 3 לילות, עם מדריך טבע ומדריך מקומי בכל הפעילויות.', image: amazon('lodge') }
	},
	{
		n: 9,
		date: '2027-06-30',
		weekday: 'רביעי',
		region: 'amazon',
		where: 'לודג׳ La Selva · מנדי קוצ׳ה',
		title: 'מעל חופת היער ובין הקופים',
		summary: 'עולים למגדל תצפית בגובה 36 מ׳ מעל קרקעית היער, מחפשים לוטרות ענק במנדי קוצ׳ה, פוגשים קופים והואצין סביב גרסה קוצ׳ה — ובלילה יוצאים לסיור רגלי בג׳ונגל.',
		image: amazon('jungle'),
		phone: amazon('squirrel-monkey'),
		focus: '30% 45%',
		video: clip('amazon/lagoon'),
		gallery: [amazon('hoatzin'), amazon('squirrel-monkey'), amazon('canoe-binoculars'), amazon('toucan'), amazon('night-walk'), amazon('frog')],
		schedule: [
			{ title: 'השכמה וארוחת בוקר', kind: 'free' },
			{ title: 'מגדל התצפית', kind: 'tour', text: 'אחרי הליכה של רבע שעה מתגלה המגדל — 36 מטרים מעל קרקעית היער. המדריכים, עם טלסקופ תצפית, מראים לנו ציפורים צבעוניות בחופת העצים, ולפעמים גם קופים.' },
			{ title: 'אגם מנדי קוצ׳ה', kind: 'tour', text: 'עוד חצי שעה הליכה אל אגם קטן בלב היער המוצף, עם צמחייה ונופים אחרים לגמרי. עם קצת מזל נראה את לוטרות הענק שחיות בסביבה — מין נדיר בסכנת הכחדה.' },
			{ title: 'ארוחת צהריים וזמן חופשי', kind: 'free', text: 'בין הפעילויות: קיאקים על הלגונה, עיסוי, או סתם מנוחה בחדר.' },
			{ title: 'אגם גרסה קוצ׳ה', kind: 'tour', text: 'מהאגמים היפים באמזונס האקוודורי. להקות של קופי סנאי מצטרפות למשפחות קפוצ׳ינים בחיפוש אחר מזון, קופי יללן מבלים כאן את שעות אחר הצהריים, וההואצין — ציפור ייחודית שחיה רק באמזונס הבתולי — נראה כאן בקלות.' },
			{ title: 'סיור לילי רגלי', kind: 'tour', text: 'פנס ומצלמה — זה כל מה שצריך כדי לראות את הג׳ונגל מתעורר בלילה: דו-חיים, חרקים, זוחלים, ציפורים ויונקי לילה, בכל מקום שהמדריכים יובילו אותנו.' },
			{ title: 'ארוחת ערב בלודג׳', kind: 'free' }
		],
		hotel: { name: 'La Selva Eco Lodge' }
	},
	{
		n: 10,
		date: '2027-07-01',
		weekday: 'חמישי',
		region: 'amazon',
		where: 'נהר הנאפו · פילצ׳י · שביל קוטו',
		title: 'מאות תוכים וקהילה ילידית',
		summary: 'בוקר בסירה אל ליקוק החימר — מאות תוכים ותוכונים שמתקבצים לאכול אדמה עשירה במינרלים. ביקור בקהילה הילידית פילצ׳י, ואחר הצהריים שביל קוטו וקאנו חזרה בין קיימנים.',
		image: amazon('clay-lick'),
		focus: '55% 85%',
		photoTop: true,
		gallery: [amazon('macaws'), amazon('kapok'), clip('amazon/ceiba'), amazon('boardwalk'), amazon('jungle-vines'), amazon('creek')],
		schedule: [
			{ title: 'השכמה וארוחת בוקר מוקדמת', kind: 'free' },
			{ title: 'ליקוק החימר של התוכים', kind: 'tour', text: 'חוזרים לנהר הנאפו ושטים בקאנו מנועי אל אחד המחזות המרתקים בטבע: מאות תוכים ותוכונים מתקבצים כדי לאכול את האדמה העשירה במינרלים — חלק חשוב בתזונה שלהם. משקפת חובה.' },
			{ title: 'הקהילה הילידית פילצ׳י', kind: 'tour', text: 'לומדים איך חיו העמים הראשונים של האמזונס לפני אלפי שנים: מה לבשו, מה אכלו, איך בישלו ואיך השתמשו בכל מה שהיער נותן. אל תתביישו לשאול — הם אוהבים לשתף בידע של אבותיהם ובסיפור של המקום שבו הם חיים.' },
			{ title: 'ארוחת צהריים וזמן חופשי', kind: 'free', text: 'קיאקים, עיסוי או מנוחה בחדר.' },
			{ title: 'שביל קוטו', kind: 'tour', text: 'הליכה מהלודג׳ אל שפת אגם גרסה קוצ׳ה באור הרך של אחר הצהריים. המדריך מצביע על היצורים שבדרך, והמדריך המקומי מראה צמחי מרפא שבני המקום משתמשים בהם אלפי שנים. החזרה בקאנו — עם קיימנים, עטלפים וחיות לילה סביב האגם.' },
			{ title: 'תדריך יציאה וקוקטייל פרידה', kind: 'hotel', text: 'מנהל הלודג׳ מסביר על סדרי היציאה מחר בבוקר, והברמן מגיש קוקטייל פרידה.' },
			{ title: 'ארוחת ערב אחרונה בג׳ונגל', kind: 'free' }
		],
		hotel: { name: 'La Selva Eco Lodge' }
	},
	{
		n: 11,
		date: '2027-07-02',
		weekday: 'שישי',
		region: 'andes',
		where: 'La Selva · קוקה · קיטו',
		title: 'חוזרים לקיטו',
		summary: 'השכמה מוקדמת, שיט במעלה הנאפו חזרה לקוקה, טיסה לקיטו והתארגנות לשבת.',
		image: amazon('paddle'),
		gallery: [img('hotel-quito')],
		schedule: [
			{ title: 'השכמה מוקדמת וארוחת בוקר', kind: 'free' },
			{ title: 'שיט במעלה הנאפו לקוקה', kind: 'transfer', text: 'צוות הלודג׳ מטפל במזוודות, והקאנו המנועי שט במעלה הנהר חזרה לקוקה. הפסקה קצרה במשרד של La Selva, ומשם לשדה התעופה — הנציגים עוזרים עם כרטיסי העלייה והמזוודות.' },
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
		image: img('quito-sanfrancisco'),
		focus: '45% 50%',
		photoTop: true,
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
		gallery: [photo('boobies'), photo('booby-nest'), photo('iguana-beach'), img('galapaguera')],
		schedule: [
			{ time: '05:00', title: 'צ׳ק-אאוט והעברה לשדה', kind: 'transfer' },
			{ time: '07:38', title: 'טיסה קיטו ← סן קריסטובל (דרך גואיאקיל)', kind: 'flight' },
			{ time: '10:30', title: 'העברה מהשדה למלון', kind: 'transfer' },
			{ time: '14:00', title: 'גלאפגוארה, אל חונקו ופוארטו צ׳ינו', kind: 'tour', text: 'הגלאפגוארה — שטח שבו צבי ענק מסתובבים חופשי, ומרכז הרבייה שבו בוקעים הצבים הצעירים. לגונת אל חונקו — אגם מים מתוקים בתוך מכתש בגובה 700 מ׳, המקום האהוב על ציפורי הפריגטה. ולסיום: פוארטו צ׳ינו, חוף חול לבן וגלים בטורקיז, עם אריות ים וכחולי-רגל.' },
			{ time: '17:00', title: 'צ׳ק-אין בקאסה אופונטיה', kind: 'hotel' }
		],
		hotel: { name: 'Casa Opuntia', text: 'על טיילת החוף, מטרים מחוף פלאיה דה אורו, עם מסעדת גן המשקיפה על המפרץ.', image: img('casa-opuntia') }
	},
	{
		n: 14,
		date: '2027-07-05',
		weekday: 'שני',
		region: 'galapagos',
		where: 'סן קריסטובל · סנטה קרוז',
		title: 'גבעת הפריגטות ומעבר לסנטה קרוז',
		summary: 'מרכז המבקרים, גבעת הפריגטות — שם נחת דרווין לראשונה — ושיט במעבורת לאי סנטה קרוז.',
		image: photo('frigatebird'),
		gallery: [photo('sunset-pier'), img('tijeretas'), photo('booby-nest')],
		schedule: [
			{ time: '10:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '11:00', title: 'מרכז המבקרים (Interpretation Center)', kind: 'tour', text: 'ההיסטוריה הטבעית והאנושית של האיים — מהמוצא הוולקני ועד מאבקי השימור של היום.' },
			{ time: '12:00', title: 'גבעת הפריגטות (Cerro Tijeretas)', kind: 'tour', text: 'תצפיות על ציפורי הפריגטה, על הסלע "האריה הישן" ועל המפרץ, לצד פסל של דרווין — זה היה האי הראשון שבו ביקר.' },
			{ time: '15:00', title: 'מעבורת סן קריסטובל ← סנטה קרוז', kind: 'transfer', text: 'שיט של כשעתיים.' },
			{ time: '17:10', title: 'צ׳ק-אין במלון פייסטה, פוארטו איורה', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Fiesta', text: 'בפוארטו איורה, קרוב לחוף, לתחנת דרווין ולמפרץ טורטוגה. בריכה חיצונית ומרפסת.', image: img('fiesta') }
	},
	{
		n: 15,
		date: '2027-07-06',
		weekday: 'שלישי',
		region: 'galapagos',
		where: 'סנטה קרוז',
		title: 'שנירקול עם אריות ים',
		summary: 'שיט במפרץ: שחייה עם אריות ים וצבי ים, תעלת הכרישים, לאס גרייטאס, ואחר הצהריים — חוף טורטוגה ביי.',
		/** תמונת הפתיחה של הסרטון, כדי שלא תהיה קפיצה כשהוא מתחיל */
		image: '/video/galapagos/snorkel-turtle.jpg',
		video: clip('galapagos/snorkel-turtle'),
		/** הצב, מעל הטקסט */
		focus: '68% 45%',
		photoTop: true,
		gallery: [clip('galapagos/turtle'), photo('shark-cave'), hero('sealions'), photo('swim-turtle'), photo('crab-lava'), clip('galapagos/reef')],
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
		image: photo('crab'),
		gallery: [img('darwin-station'), photo('sunset-harbor')],
		schedule: [
			{ time: '07:00', title: 'צ׳ק-אאוט', kind: 'hotel' },
			{ time: '07:15', title: 'תחנת המחקר צ׳ארלס דרווין', kind: 'tour', text: 'הליכה קלה בשבילים מסומנים, מתאימה לכל הגילאים. כ-2–3 שעות.' },
			{ time: '09:15', title: 'העברה פרטית לשדה התעופה בלטרה', kind: 'transfer' },
			{ time: '12:00', title: 'טיסה בלטרה ← גואיאקיל (LATAM)', kind: 'flight' },
			{ time: '16:00', title: 'צ׳ק-אין בסדרוס אין', kind: 'hotel' }
		],
		hotel: { name: 'Hotel Cedros Inn', text: 'מלון בוטיק מודרני בלב גואיאקיל, 24 חדרים, בריכה חיצונית, גן ומרפסת שקטה.', image: photo('cedros-inn') }
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
		framed: true,
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
		focus: '65% 50%',
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
		framed: true,
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
		image: photo('textiles'),
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
	'ארוחות כשרות — בתוספת תשלום',
	'דמי כניסה באתרים מסוימים (למשל תרומה במפל פגוצ׳ה)',
	'עלייה ברכבל של קיטו ביום שישי — 8–10$',
	'אגרת כניסה לאיי גלאפגוס — 200$, לא כלולה במחיר (כל מטיילת משלמת באופן עצמאי)',
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

/** "חשוב לדעת" — מוצג במצגת ובעמוד "מה כלול" */
export const goodToKnow = [
	{
		icon: '🧳',
		title: 'כבודה לאיי גלאפגוס',
		text: 'מזוודה עד 20 ק״ג ועוד טרולי עד 8 ק״ג. על כל חריגה במשקל משלמים 20$.'
	},
	{
		icon: '💉',
		title: 'בטיחות ובריאות',
		text: 'לפני הנסיעה יש לעבור במרפאת מטיילים לקבלת החיסונים הנדרשים וכדורי מלרון (נגד מלריה).'
	},
	{
		icon: '🍽',
		title: 'ארוחות כשרות',
		text: 'אפשר להזמין ארוחות כשרות בתוספת תשלום.'
	},
	{
		icon: '🚡',
		title: 'הרכבל של קיטו',
		text: 'העלייה ברכבל ביום שישי (יום 4) עולה 8–10$, בתשלום במקום.'
	}
];
