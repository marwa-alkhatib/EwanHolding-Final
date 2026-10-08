import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<'ar' | 'en'>(
    (localStorage.getItem('ewan-language') as 'ar' | 'en') || 'ar',
  );
  private readonly ar: Record<string, string> = {
    Home: 'الرئيسية',

    About: 'من نحن',
    'About Us': 'من نحن',
    'About us': 'من نحن',

    Companies: 'الشركات',
    COMPANIES: 'الشركات',
    'Our companies': 'شركاتنا',
    'OUR COMPANIES': 'شركاتنا',

    Investment: 'الاستثمار',
    'Investment Opportunities': 'فرص الاستثمار',
    'Investment opportunities': 'فرص الاستثمار',

    News: 'الأخبار',
    'News Release': 'الأخبار',
    'News release': 'الأخبار',

    Contact: 'تواصل معنا',
    'Contact Us': 'تواصل معنا',
    'Contact us': 'تواصل معنا',

    'Riyadh, Saudi Arabia': 'الرياض، المملكة العربية السعودية',

    'Building enduring value': 'نبني قيمة مستدامة',
    "across the Kingdom's industries.": 'عبر قطاعات المملكة.',

    'Years in the market': 'سنوات في السوق',
    'Operating companies': 'شركات عاملة',
    'Branches nationwide': 'فروع في أنحاء المملكة',
    'Our footprint': 'انتشارنا',
    '25 branches': '25 فرعًا',

    'EWAN HOLDING': 'إيوان القابضة',
    Ewan: 'إيوان',
    Holding: 'القابضة',

    'Our vision': 'رؤيتنا',
    'What guides us': 'ما الذي يوجهنا',

    'Four principles behind every': 'أربعة مبادئ وراء كل',
    'company we build.': 'شركة نبنيها.',

    Collaboration: 'التعاون',
    Empowerment: 'التمكين',
    Integrity: 'النزاهة',
    Excellence: 'التميز',

    'Ewan Holding invests in and operates businesses across logistics, contracting, hospitality, human capital and security — grounded in five decades of market experience.':
      'تستثمر إيوان القابضة وتدير أعمالًا في الخدمات اللوجستية والمقاولات والضيافة ورأس المال البشري والأمن، مستندة إلى خبرة تمتد لعقود في السوق.',

    'A diversified holding structure that pairs long-term capital with hands-on operating discipline, built to compound value for shareholders and partners across every sector we enter.':
      'هيكل قابض متنوع يجمع بين الاستثمار طويل الأجل والانضباط التشغيلي المباشر، بهدف تنمية القيمة للمساهمين والشركاء في كل قطاع ندخله.',

    'To achieve sustainable success and create enduring value for our shareholders and partners — investing in promising opportunities and building strategic partnerships based on trust and excellence.':
      'تحقيق نجاح مستدام وصناعة قيمة طويلة الأجل لمساهمينا وشركائنا، من خلال الاستثمار في الفرص الواعدة وبناء شراكات استراتيجية قائمة على الثقة والتميز.',

    'Close partnership with clients and stakeholders, built on shared goals rather than transactions.':
      'شراكة وثيقة مع العملاء وأصحاب المصلحة تقوم على الأهداف المشتركة لا على المعاملات فقط.',

    'A culture where our people are trusted to lead, create and grow across every business unit.':
      'ثقافة تمنح أفرادنا الثقة للقيادة والإبداع والنمو في جميع وحدات الأعمال.',

    'Transparent decisions and ethical standards that hold regardless of scale or pressure.':
      'قرارات شفافة ومعايير أخلاقية ثابتة مهما كان حجم العمل أو ضغطه.',

    'A continuous pursuit of quality and innovation in every part of the business.':
      'سعي مستمر للجودة والابتكار في كل جزء من أعمالنا.',

    'one vision': 'رؤية واحدة',
    'EWAN COMPANY': 'شركة إيوان',

    'Read more': 'اقرأ المزيد',
    'Read more →': 'اقرأ المزيد ←',
    'View company →': 'عرض الشركة ←',
    'VIEW ALL COMPANIES': 'عرض كل الشركات',
    'View all companies →': 'عرض كل الشركات ←',
    'Explore all companies': 'استكشف كل الشركات',
    'EXPLORE EWAN →': 'استكشف إيوان ←',

    'Latest news': 'آخر الأخبار',
    'View all news': 'عرض كل الأخبار',

    'Stories from': 'قصص من',
    'across Ewan.': 'عبر إيوان.',
    'NEWS / 2026': 'الأخبار / 2026',

    'Updates, achievements, and perspectives from our growing family of companies.':
      'تحديثات وإنجازات ورؤى من عائلة شركات إيوان المتنامية.',

    "What's happening across the group.": 'آخر أخبار مجموعة إيوان.',
    "What's happening across the": 'آخر أخبار',
    'group.': 'مجموعة إيوان.',

    'Company news and investment updates, a few times a year — nothing more.':
      'أخبار الشركات وتحديثات الاستثمار عدة مرات خلال العام.',

    'Join our newsletter': 'انضم إلى نشرتنا البريدية',
    Subscribe: 'اشترك',
    'Your email address': 'بريدك الإلكتروني',
    'Enter your email address': 'أدخل بريدك الإلكتروني',

    'STAY CONNECTED': 'ابقَ على تواصل',
    'Stay connected': 'ابقَ على تواصل',

    'Stay informed on Ewan Holding’s growth.': 'ابقَ على اطلاع على نمو إيوان القابضة.',

    'Stay informed on': 'ابقَ على اطلاع على',
    'Ewan Holding’s': 'إيوان القابضة',
    'growth.': 'ونموها.',

    'Be the first to receive insights, updates and opportunities across our businesses.':
      'كن أول من يتلقى أحدث الرؤى والتحديثات والفرص عبر أعمالنا.',

    'Who we are': 'من نحن',

    'A Saudi group of companies operating across maintenance, contracting, logistics, HR, hospitality and security since 1999.':
      'مجموعة شركات سعودية تعمل في الصيانة والمقاولات والخدمات اللوجستية والموارد البشرية والضيافة والأمن منذ عام 1999.',

    'A leading Saudi group of companies committed to surpassing expectations across every sector we operate in.':
      'مجموعة سعودية رائدة من الشركات ملتزمة بتجاوز التوقعات في كل قطاع نعمل فيه.',

    'Established in 1999, built for the long term.': 'تأسست عام 1999 وبُنيت للاستمرار.',

    'What holds our companies together.': 'ما يجمع شركاتنا معًا.',

    'We aim to lead sustainable development across our sectors — expanding our capabilities, adopting new technologies, and adapting as markets change, so we stay at the forefront of every field we work in.':
      'نهدف إلى قيادة التنمية المستدامة في قطاعاتنا عبر توسيع قدراتنا وتبني التقنيات الجديدة والتكيف مع تغير الأسواق لنظل في مقدمة مجالات عملنا.',

    'Do you have any questions? Contact us.': 'هل لديك أي أسئلة؟ تواصل معنا.',

    'We love to communicate — reach us directly, or send a message below.':
      'يسعدنا التواصل معك — تواصل معنا مباشرة أو أرسل رسالة من النموذج أدناه.',

    'Reach us directly': 'تواصل معنا مباشرة',
    'Head Office': 'المكتب الرئيسي',
    'Send message': 'إرسال الرسالة',
    'Message sent successfully.': 'تم إرسال الرسالة بنجاح.',

    Name: 'الاسم',
    Phone: 'الهاتف',
    Email: 'البريد الإلكتروني',
    Subject: 'الموضوع',
    Message: 'الرسالة',

    'Where opportunity': 'حيث تلتقي الفرص',
    'meets impact.': 'بالأثر.',

    "Ewan Holding welcomes investment partners across our current portfolio and the new markets we're entering next.":
      'ترحب إيوان القابضة بشركاء الاستثمار في محفظتنا الحالية والأسواق الجديدة التي نتجه إليها.',

    'Expansion projects': 'مشاريع التوسع',
    'New projects': 'مشاريع جديدة',
    'Get in touch': 'تواصل معنا',

    Careers: 'الوظائف',
    'Explore careers': 'استكشف الوظائف',

    'Maintenance & Operations': 'الصيانة والتشغيل',
    'Technical Contracting': 'المقاولات الفنية',
    'Technical contracting': 'المقاولات الفنية',

    Logistics: 'الخدمات اللوجستية',

    'Human Resources': 'الموارد البشرية',
    'Human resources': 'الموارد البشرية',

    'Furnished Apartments': 'الشقق المفروشة',
    'Security Services': 'الخدمات الأمنية',

    'HUMAN CAPITAL': 'رأس المال البشري',
    SECURITY: 'الأمن',
    LOGISTICS: 'الخدمات اللوجستية',
    CONTRACTING: 'المقاولات',
    HOSPITALITY: 'الضيافة',

    'Terms and Conditions': 'الشروط والأحكام',
    'Terms and conditions': 'الشروط والأحكام',

    'Guidelines for using our website and services.': 'إرشادات استخدام موقعنا وخدماتنا.',

    'Use of the Website': 'استخدام الموقع',
    'Intellectual Property': 'الملكية الفكرية',
    'Information Accuracy': 'دقة المعلومات',
    'Third-Party Links': 'روابط الجهات الخارجية',
    'Limitation of Liability': 'حدود المسؤولية',
    'Changes to These Terms': 'التغييرات على هذه الشروط',

    'Copyright © 2026 Ewan Holding. All rights reserved.':
      'حقوق النشر © 2026 إيوان القابضة. جميع الحقوق محفوظة.',

    '© 2026 Ewan Holding. All rights reserved.': '© 2026 إيوان القابضة. جميع الحقوق محفوظة.',

    'Discover more': 'اكتشف المزيد',
    'Learn more': 'اعرف المزيد',
    'Learn more →': 'اعرف المزيد ←',
    'Learn more about us': 'اعرف المزيد عنا',

    'Explore our work': 'استكشف أعمالنا',
    'Explore our other companies': 'استكشف شركاتنا الأخرى',

    'Our approach': 'نهجنا',
    'OUR APPROACH': 'نهجنا',

    'OUR SERVICES': 'خدماتنا',
    Services: 'الخدمات',

    'HOW WE WORK': 'كيف نعمل',
    OVERVIEW: 'نظرة عامة',

    'WHY EWAN SECURITY': 'لماذا إيوان للأمن',
    'WHY CHOOSE US': 'لماذا تختارنا',
    'Why choose us': 'لماذا تختارنا',

    'OUR STANDARD': 'معيارنا',
    'OUR PRIORITY': 'أولويتنا',

    Quality: 'الجودة',
    Safety: 'السلامة',
    Reliability: 'الموثوقية',
    Experience: 'الخبرة',
    Flexibility: 'المرونة',
    Convenience: 'الراحة',
    Comfort: 'الراحة',
    Growth: 'النمو',
    Sustainability: 'الاستدامة',
    Projects: 'المشاريع',

    Company: 'الشركة',
    Businesses: 'الأعمال',
    PEOPLE: 'الأفراد',
    BUSINESSES: 'الأعمال',

    'A STRONGER TOMORROW': 'غدٌ أقوى',
    'A BRIGHTER TOMORROW': 'غدٌ أكثر إشراقًا',
    "LET'S BUILD WHAT'S NEXT": 'لنبنِ القادم معًا',

    'A Saudi investment holding group fostering innovation, growth and sustainable value across every company we build.':
      'مجموعة استثمارية سعودية قابضة تعزز الابتكار والنمو والقيمة المستدامة في كل شركة نبنيها.',

    'A Saudi investment holding group fostering': 'مجموعة استثمارية سعودية قابضة تعزز',

    'innovation, growth and sustainable value': 'الابتكار والنمو والقيمة المستدامة',

    'across every company we build.': 'في كل شركة نبنيها.',

    '6 businesses, one operating standard.': '6 شركات، بمعيار تشغيلي واحد.',

    'businesses, one operating': 'شركات، بمعيار تشغيلي',

    'standard.': 'واحد.',

    'Stronger together': 'معًا نصنع قوة أكبر',
    'Ewan Maintenance & Operations': 'إيوان للصيانة والتشغيل',
    'Ewan Technical Contracting': 'إيوان للمقاولات الفنية',
    'Ewan Logistics': 'إيوان للخدمات اللوجستية',
    'Ewan Human Resources': 'إيوان للموارد البشرية',
    'Ewan Furnished Apartments': 'إيوان للشقق المفروشة',
    'Ewan Security Services': 'إيوان للخدمات الأمنية',

    '7883 Northern Ring Branch Rd, Al Muruj, Riyadh 12283':
      '7883 طريق الدائري الشمالي الفرعي، حي المروج، الرياض 12283',
    // ================= INVESTMENT PAGE =================

    'Invest alongside': 'استثمر جنبًا إلى جنب مع',

    'a group built': 'مجموعة بُنيت',

    for: 'من أجل',

    // 'growth.': 'النمو.',

    IDEAS: 'الأفكار',

    INDUSTRIES: 'القطاعات',

    'OPPORTUNITIES — 01': 'الفرص — 01',

    'We invest in sectors that shape stronger communities and brighter futures. Whether you’re looking to expand, collaborate or bring a new idea to life, we’re open to partnerships that create long-term value.':
      'نستثمر في القطاعات التي تسهم في بناء مجتمعات أقوى ومستقبل أكثر إشراقًا. سواء كنت تتطلع إلى التوسع أو التعاون أو تحويل فكرة جديدة إلى واقع، فنحن منفتحون على شراكات تحقق قيمة طويلة الأجل.',

    "We invest in sectors that shape stronger communities and brighter futures. Whether you're looking to expand, collaborate or bring a new idea to life, we're open to partnerships that create long-term value.":
      'نستثمر في القطاعات التي تسهم في بناء مجتمعات أقوى ومستقبل أكثر إشراقًا. سواء كنت تتطلع إلى التوسع أو التعاون أو تحويل فكرة جديدة إلى واقع، فنحن منفتحون على شراكات تحقق قيمة طويلة الأجل.',

    INVEST: 'استثمر',

    GROW: 'انمُ',

    TOGETHER: 'معًا',

    'Core Companies': 'الشركات الأساسية',

    'Sectors of Growth': 'قطاعات النمو',

    'Years of Experience': 'سنوات الخبرة',

    'Shared Vision': 'رؤية مشتركة',

    'Partner for': 'كن شريكًا من أجل',

    'a stronger': 'مستقبل',

    'tomorrow.': 'أقوى',

    "We're always open to conversations with aligned partners, investors and forward-thinking businesses.":
      'نرحب دائمًا بالحوار مع الشركاء والمستثمرين والشركات الطموحة التي تشاركنا رؤيتنا للمستقبل.',

    OPPORTUNITIES: 'الفرص',

    PROGRESS: 'التقدم',

    'Interested in exploring an investment opportunity with Ewan Holding? Our team is ready to talk through current projects, investment criteria and next steps.':
      'هل ترغب في استكشاف فرصة استثمارية مع إيوان القابضة؟ فريقنا مستعد لمناقشة المشاريع الحالية ومعايير الاستثمار والخطوات التالية.',

    "Build your career with Ewan. We're a collaborative team committed to continuous learning — if you thrive in a supportive environment, we'd like to hear from you.":
      'ابنِ مسيرتك المهنية مع إيوان. نحن فريق متعاون ملتزم بالتعلم المستمر، وإذا كنت تتطلع إلى التطور في بيئة داعمة، يسعدنا أن نسمع منك.',

    businesses: 'شركات',

    'Diverse businesses, a shared commitment. Each Ewan company plays a distinct role in building a stronger, more connected tomorrow.':
      'أعمال متنوعة والتزام مشترك. تلعب كل شركة من شركات إيوان دورًا مميزًا في بناء مستقبل أقوى وأكثر ترابطًا.',
    'Excellence assurance. Advancing progress.': 'ضمان التميز. والمضي قدمًا نحو التقدم.',

    'Ewan Holdings Group brings together a portfolio of Saudi companies, each held to the same standard: innovative solutions and superior service, tailored to the needs of every client we serve.':
      'تجمع مجموعة إيوان القابضة نخبة من الشركات السعودية التي تلتزم جميعها بمعيار واحد: حلول مبتكرة وخدمة متميزة مصممة لتلبية احتياجات كل عميل نخدمه.',

    "Since our founding we've built a track record exceeding one billion Saudi Riyals in completed projects across maintenance and operations, human resources, technical contracting, security services, logistics and furnished apartments.":
      'منذ تأسيسنا، بنينا سجلًا حافلًا بمشاريع مكتملة تتجاوز قيمتها مليار ريال سعودي في قطاعات الصيانة والتشغيل والموارد البشرية والمقاولات الفنية والخدمات الأمنية والخدمات اللوجستية والشقق المفروشة.',

    'Shaping a sustainable future.': 'نصنع مستقبلًا مستدامًا.',

    'A steadfast commitment to the highest ethical standards and transparency.':
      'التزام راسخ بأعلى المعايير الأخلاقية والشفافية.',

    'A culture of creativity, diversity and inclusion where our people can thrive.':
      'ثقافة قائمة على الإبداع والتنوع والشمول، تتيح لأفرادنا النمو والازدهار.',

    'Close teamwork with clients and partners, working toward shared success.':
      'تعاون وثيق مع العملاء والشركاء لتحقيق النجاح المشترك.',

    'Local investment': 'الاستثمار المحلي',

    'Empowering local talent, supporting our community.': 'تمكين المواهب المحلية ودعم مجتمعنا.',

    'We prioritize local content in our operations, sourcing goods and services from Saudi companies wherever possible, and invest heavily in training, mentoring and career development for the next generation of Saudi talent.':
      'نعطي الأولوية للمحتوى المحلي في عملياتنا، ونعتمد على السلع والخدمات المقدمة من الشركات السعودية كلما أمكن، كما نستثمر بشكل كبير في التدريب والتوجيه والتطوير المهني للجيل القادم من المواهب السعودية.',

    'This commitment to progressive thinking and continuous expansion keeps us responsive to change, quick to adopt new technologies and business models, and firmly positioned as a trusted partner across the industries we serve.':
      'يساعدنا التزامنا بالتفكير المتطور والتوسع المستمر على الاستجابة للتغيير بسرعة، وتبني التقنيات ونماذج الأعمال الجديدة، وترسيخ مكانتنا كشريك موثوق في مختلف القطاعات التي نخدمها.',

    // ================= COMPANY DETAILS =================

    '01 — OVERVIEW': '01 — نظرة عامة',

    '02 — OUR SERVICES': '02 — خدماتنا',

    '03 — WHY CHOOSE US': '03 — لماذا تختارنا',

    '04 — OUR GROUP': '04 — مجموعتنا',

    'What we deliver': 'ما نقدمه',

    'Other companies': 'شركات أخرى',

    'View company': 'عرض الشركة',

    'SOLUTIONS THAT': 'حلول',

    'KEEP YOU AHEAD': 'تبقيك في المقدمة',

    FROM: 'من',

    WAREHOUSE: 'المستودع',

    "TO WHAT'S": 'إلى ما هو',

    NEXT: 'قادم',

    ANY: 'أي',

    DISTANCE: 'مسافة',

    'A CLOSER': 'نحو غدٍ',

    TOMORROW: 'أقرب',

    GOODS: 'البضائع',

    // 'OPPORTUNITIES': 'الفرص',

    FURTHER: 'أبعد',

    'Our group': 'مجموعتنا',

    'OUR GROUP': 'مجموعتنا',

    'View All Companies': 'عرض كل الشركات',

    across: 'من أنحاء',

    'Ewan.': 'إيوان.',

    'A continuous, unhurried pursuit of quality in operations, service and craftsmanship.':
  'سعي مستمر ومتأنٍ نحو الجودة في العمليات والخدمات والإتقان في العمل.',
  };
  private content = new Map<string, { ar: string; en: string }>();
  constructor(private http: HttpClient) {
    this.apply(this.language());
    this.http.get<any[]>('http://localhost:5050/api/PageContent').subscribe({
      next: (items) => {
        for (const x of items) this.content.set(x.key, { ar: x.value_Ar, en: x.value_En });
      },
      error: () => {},
    });
  }
  toggle() {
    this.apply(this.language() === 'ar' ? 'en' : 'ar');
  }
  apply(lang: 'ar' | 'en') {
    this.language.set(lang);
    localStorage.setItem('ewan-language', lang);

    document.documentElement.lang = lang;

    // Never mirror the website layout
    document.documentElement.dir = 'ltr';
  }
  pick(ar: string, en: string) {
    return this.language() === 'ar' ? ar || en : en || ar;
  }
  translate(value: string) {
    const key = value.trim();
    const custom = this.content.get(key);
    if (custom) return this.language() === 'ar' ? custom.ar || value : custom.en || value;
    return this.language() === 'ar' ? this.ar[key] || value : value;
  }
}
