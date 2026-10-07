import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  tabs: string[];
  imageUrl: string;
  name: string;
  description: string;
  price: string;
  id: number;
}

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  activeTab = 'ყველა';

  tabs: string[] = ['ყველა', 'ბურგერები', 'გარნირები & სოუსები', 'სასმელები', 'ტკბილეული'];

  // ========== ბურგერები ==========
  private readonly imgHalapeno   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%B0%E1%83%90%E1%83%9A%E1%83%90%E1%83%9E%E1%83%94%E1%83%9C%E1%83%98%E1%83%9D-%E1%83%91%E1%83%A3%E1%83%A0%E1%83%92%E1%83%94%E1%83%A0%E1%83%98-1920x1080.jpg';
  private readonly img5Cheese   = 'https://burgerlions.com/wp-content/uploads/2025/12/5-%E1%83%A7%E1%83%95%E1%83%94%E1%83%9A%E1%83%98%E1%83%A1-%E1%83%91%E1%83%A3%E1%83%A0%E1%83%92%E1%83%94%E1%83%A0%E1%83%98.jpg';
  private readonly imgWhiteLion = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%97%E1%83%94%E1%83%97%E1%83%A0%E1%83%98-%E1%83%9A%E1%83%9D%E1%83%9B%E1%83%98.jpg';
  private readonly imgZeus      = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%96%E1%83%94%E1%83%95%E1%83%A1%E1%83%98.jpg';
  private readonly imgSphinx    = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A1%E1%83%A4%E1%83%98%E1%83%9C%E1%83%A5%E1%83%A1%E1%83%98-1920x1080.jpg';
  private readonly imgEverest   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%94%E1%83%95%E1%83%94%E1%83%A0%E1%83%94%E1%83%A1%E1%83%A2%E1%83%98.jpg';
  private readonly imgSteak     = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A1%E1%83%A2%E1%83%94%E1%83%98%E1%83%99-%E1%83%91%E1%83%A3%E1%83%A0%E1%83%92%E1%83%94%E1%83%A0%E1%83%98-1920x1080.jpg';
  private readonly imgIdeafix   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%98%E1%83%93%E1%83%94%E1%83%90-%E1%83%A4%E1%83%98%E1%83%A5%E1%83%A1%E1%83%98-.jpg';
  private readonly imgIdeafixP  = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%98%E1%83%93%E1%83%94%E1%83%90-%E1%83%A4%E1%83%98%E1%83%A5%E1%83%A1%E1%83%98-2.jpg';
  private readonly imgObelix    = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%9D%E1%83%91%E1%83%94%E1%83%9A%E1%83%98%E1%83%A5%E1%83%A1%E1%83%98-1920x1080.jpg';
  private readonly imgObelixP   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%9D%E1%83%91%E1%83%94%E1%83%9A%E1%83%98%E1%83%A5%E1%83%A1--1920x1080.jpg';
  private readonly imgAsterix   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%90%E1%83%A1%E1%83%A2%E1%83%94%E1%83%A0%E1%83%98%E1%83%A5%E1%83%A1%E1%83%98.jpg';
  private readonly imgDruid     = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%93%E1%83%A0%E1%83%A3%E1%83%98%E1%83%93%E1%83%98.jpg';
  private readonly imgJulius    = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%98%E1%83%A3%E1%83%9A%E1%83%98%E1%83%A3%E1%83%A1%E1%83%98-2.jpg';
  private readonly imgRome      = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A0%E1%83%9D%E1%83%9B%E1%83%98-1920x1080.jpg';
  private readonly imgBacon     = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%91%E1%83%94%E1%83%99%E1%83%9D%E1%83%9C-%E1%83%91%E1%83%A3%E1%83%A0%E1%83%92%E1%83%94%E1%83%A0%E1%83%98.jpg';
  private readonly imgCheese    = 'https://burgerlions.com/wp-content/uploads/2025/12/Cheeseburger.webp';
  private readonly imgGladiator = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%92%E1%83%9A%E1%83%90%E1%83%93%E1%83%98%E1%83%90%E1%83%A2%E1%83%9D%E1%83%A0%E1%83%98-2.jpg';
  private readonly imgBigMax    = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%91%E1%83%98%E1%83%92%E1%83%9B%E1%83%90%E1%83%A5%E1%83%A1%E1%83%98.jpg';
  private readonly imgSmesh2X   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A1%E1%83%9B%E1%83%94%E1%83%A8%E1%83%98-2X-1920x1080.jpg';
  private readonly imgSmesh4X   = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A1%E1%83%9B%E1%83%94%E1%83%A8%E1%83%98-4-X-1920x1080.jpg';
  private readonly imgCake      = 'https://burgerlions.com/wp-content/uploads/2025/12/torti.webp';
  private readonly imgAsteroid  = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%90%E1%83%A1%E1%83%A2%E1%83%94%E1%83%A0%E1%83%9D%E1%83%98%E1%83%93%E1%83%98-2.jpg';
  private readonly imgLionRoar  = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%9A%E1%83%9D%E1%83%9B%E1%83%98%E1%83%A1-%E1%83%A6%E1%83%A0%E1%83%98%E1%83%90%E1%83%9A%E1%83%98.jpg';
  private readonly imgBlackLion = 'https://burgerlions.com/wp-content/uploads/2025/12/%E1%83%A8%E1%83%90%E1%83%95%E1%83%98-%E1%83%9A%E1%83%9D%E1%83%9B%E1%83%981.jpg';

  // ========== გარნირები & სოუსები ==========
  private readonly imgLionSauceNag = 'https://burgerlions.com/wp-content/uploads/2025/12/l.s-nag.png';
  private readonly imgExtra        = 'https://burgerlions.com/wp-content/uploads/2025/12/eqstra.png';
  private readonly imgFriesHalap   = 'https://burgerlions.com/wp-content/uploads/2025/12/fri-halap.yv_.sous_-1920x1080.jpg';
  private readonly imgFriesSpec    = 'https://burgerlions.com/wp-content/uploads/2025/12/spec.kart_.fri_-1920x1078.jpg';
  private readonly imgFriesBigNag  = 'https://burgerlions.com/wp-content/uploads/2025/12/didi-fri-nag-1920x1080.jpg';
  private readonly imgFriesBig     = 'https://burgerlions.com/wp-content/uploads/2025/12/didi-fri-1920x1080.jpg';
  private readonly imgFriesMed     = 'https://burgerlions.com/wp-content/uploads/2026/04/sash.fri_-1920x1080.jpg';
  private readonly imgFriesSmall   = 'https://burgerlions.com/wp-content/uploads/2025/12/fri-1920x1080.jpg';
  private readonly imgCheeseSauce  = 'https://burgerlions.com/wp-content/uploads/2025/12/cheesesouse.webp';
  private readonly imgBbqSauce     = 'https://burgerlions.com/wp-content/uploads/2025/12/bbqsou.webp';
  private readonly imgHalapeno30   = 'https://burgerlions.com/wp-content/uploads/2025/12/halapenio30.webp';
  private readonly imgCheeseBaconS = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%9E%E1%83%90%E1%83%A2.%E1%83%A7%E1%83%95.%E1%83%91%E1%83%94%E1%83%99.png';
  private readonly imgCheeseBaconM = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%A1%E1%83%90%E1%83%A8.-%E1%83%A7%E1%83%95.%E1%83%91%E1%83%94%E1%83%99.png';
  private readonly imgCheeseBaconL = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%93.%E1%83%A7%E1%83%95.%E1%83%91%E1%83%94.png';
  private readonly imgSweetHot     = 'https://burgerlions.com/wp-content/uploads/2026/04/download-2.png';
  private readonly imgSauceBacon   = 'https://burgerlions.com/wp-content/uploads/2026/04/download-1-1920x1080.jpg';

  // ========== სასმელები ==========
  private readonly imgCola       = 'https://burgerlions.com/wp-content/uploads/2025/12/59306dba-7c1f-39f7-5031-3c9f53d43161_3.webp';
  private readonly imgFanta      = 'https://burgerlions.com/wp-content/uploads/2025/12/fanta.webp';
  private readonly imgRedBull    = 'https://burgerlions.com/wp-content/uploads/2025/12/redbull.webp';
  private readonly imgBlackBeer  = 'https://burgerlions.com/wp-content/uploads/2025/12/blacklionbeer.webp';
  private readonly imgKombucha   = 'https://burgerlions.com/wp-content/uploads/2025/12/combucha.webp';
  private readonly imgLikani     = 'https://burgerlions.com/wp-content/uploads/2025/12/likani.webp';
  private readonly imgRefresh    = 'https://burgerlions.com/wp-content/uploads/2025/12/refresh.webp';
  private readonly imgOrangeFr   = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%A4.%E1%83%A4%E1%83%A0%E1%83%94%E1%83%A8%E1%83%98.jpg';

  // ========== ტკბილეული / ყავა ==========
  private readonly imgTiramisu   = 'https://burgerlions.com/wp-content/uploads/2025/12/tiramisu.webp';
  private readonly imgSigara     = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%A1%E1%83%98%E1%83%92.png';
  private readonly imgFahlava    = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%A4%E1%83%90%E1%83%AE.png';
  private readonly imgCafeStr    = 'https://burgerlions.com/wp-content/uploads/2025/12/cafe-mondial.webp';
  private readonly imgCafeChoc   = 'https://burgerlions.com/wp-content/uploads/2025/12/cafe-mondial-chocholate.webp';
  private readonly imgEspresso   = 'https://burgerlions.com/wp-content/uploads/2025/12/espresso.webp';
  private readonly imgAmericano  = 'https://burgerlions.com/wp-content/uploads/2025/12/americano.webp';
  private readonly imgLatteMac   = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%9A.%E1%83%9B%E1%83%90%E1%83%99.webp';
  private readonly imgIcedCoffee = 'https://burgerlions.com/wp-content/uploads/2026/04/%E1%83%AA.%E1%83%A7.%E1%83%9C.webp';

  menuItems: MenuItem[] = [
    // ============= ბურგერები =============
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgObelix,    name: 'ობელიქსი', description: 'საქონლის ხორცი 300 გრ, ყველი ჩედარი 3 ფენა, სპეც სოუსი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებული), აისბერგი, მჟავე კიტრი.', price: '25.80₾', id: 1 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgObelixP,   name: 'ობელიქსი (+)', description: 'საქონლის ხორცი 300 გრ., ყველი ჩედარი 4 ფენა, ბეკონი 1 ფენა, სპეცსოუსი, ბურგერის ფუნთუშა, ხახვი, აისბერგი, მჟავე კიტრი.', price: '29.50₾', id: 2 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgWhiteLion, name: 'თეთრი ლომი', description: 'ხორცი 300 გრ. თეთრი ყველი ემენტალი 4 ფენა, მდნარი ყველი ბეკონით, ბეკონი 1 ფენა, ყველი კამემბერი 4 ფენა, საფერავში დამარინადებული ხახვი, აისბერგი, ბურგერის ფუნთუშა.', price: '29.80₾', id: 3 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.img5Cheese,   name: '5 ყველის ბურგერი', description: 'საქონლის ხორცი 300გრ, ყველი ჩედარი 4 ფენა, პარმეზანი, ყველი მიმოლეტე. ყველის სოუსი, მჟავე კიტრი, აისბერგი, ბურგერის ფუნთუშა, სპეც სოუსი.', price: '33.80₾', id: 4 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgHalapeno,  name: 'ჰალაპენიო ბურგერი', description: 'ხორცი 300 გრ, ყველი ჩედარი 4 ფენა, კარამელიზირებული ჰალაპენიო ბეკონით, სპეც სოუსი, ბურგერის ფუნთუშა, ხახვი, აისბერგი, მჟავე კიტრი.', price: '31.80₾', id: 5 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgZeus,      name: 'ზევსი', description: 'საქონლის ხორცი 300გრ, სპეც სოუსი, ბეკონი, ყველი ჩედარი 3 ფენა, ყველის სოუსი, ყველი პარმეზანი, ყველი მიმოლეტე, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერგი, ბურგერის ფუნთუშა.', price: '34.80₾', id: 6 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgSphinx,    name: 'სფინქსი (მწვადბურგერი)', description: 'ხორცი 300 გრ, ყველი ჩედარი 4 ფენა, ყველი პარმეზანი, ღორის ხორცი დაკეპილი (მსუბუქად ცხარე) 200 გრ, ჰალაპენიოს სოუსი, ყველის სოუსი, ბარბექიუს სოუსი, სპეც სოუსი.', price: '36.80₾', id: 7 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgEverest,   name: 'ევერესტი', description: '450 გრ. საქონლის ხორცი, ყველი ჩედარი, ყველი პარმეზანი, ბარბექიუს სოუსი, ჰალაპენიუ, სპეც სოუსი, ყველის სოუსი, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერგი, ორეგანო.', price: '36.80₾', id: 8 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgSteak,     name: 'სტეიკ ბურგერი', description: 'საქონლის ხორცი 300 გრ. ყველი ჩედარი, ხახვი (საფერავში დამარინადებული), მჟავე კიტრი, აისბერგი, ღორის სტეიკი, სპეც სოუსი, ბურგერის ფუნთუშა.', price: '47.50₾', id: 9 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgIdeafix,   name: 'იდეაფიქსი', description: 'საქონლის ხორცი 150 გრ, სპეც სოუსი, ყველი ჩედარი 2 ფენა, პური, ხახვი (საფერავში დამარინადებლი), აისბერგი, მჟავე კიტრი, პარმეზანი, ბარბიქიუს სოუსი.', price: '19.80₾', id: 10 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgIdeafixP,  name: 'იდეაფიქსი (+)', description: 'საქონლის ხორცი 150 გრ, სპეცსოუსი, ყველი ჩედარი 3 ფენა, ხახვი (საფერავში დამარინადებული), აისბერგი, მჟავე კიტრი, ბეკონი 1 ფენა, პარმეზანი, ბარბიქიოს სოუსი, ბურგერის ფუნთუშა.', price: '21.50₾', id: 11 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgAsterix,   name: 'ასტერიქსი', description: 'ხორცი 450 გრ., ყველი ჩედარი 4 ფენა, ბეკონი 2 ფენა, სპეცსოუსი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებლი), აისბერგი, მჟავე კიტრი.', price: '33.50₾', id: 12 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgDruid,     name: 'დრუიდი', description: 'ხორცი 600 გრ., ყველი ჩედარი 5 ფენა, ბეკონი 2 ფენა, სპეცსოუსი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებლი), აისბერგი, მჟავე კიტრი.', price: '36.80₾', id: 13 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgJulius,    name: 'იულიუსი', description: 'ხორცი 750 გრ., ყველი ჩედარი 6 ფენა, ბეკონი 2 ფენა, სპეცსოუსი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებლი), აისბერგი, მჟავე კიტრი.', price: '39.80₾', id: 14 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgRome,      name: 'ორმაგი პრობლემა', description: 'ხორცი 300 გრ., ყველი ჩედარი 3 ფენა, კეტჩუპი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებული), აისბერგი, მჟავე კიტრი.', price: '26.80₾', id: 15 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgBacon,     name: 'ბეკონ-ბურგერი', description: 'ხორცი 300 გრ., ყველი ჩედარი 3 ფენა, ბეკონი 5 ფენა, ბარბექიუ სოუსი, სპეცსოუსი, ბურგერის ფუნთუშა, ხახვი (საფერავში დამარინადებლი), აისბერგი, მჟავე კიტრი.', price: '32.50₾', id: 16 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgCheese,    name: 'ჩიზბურგერი', description: 'ხორცი 150 გრ., ყველი ჩედარი 3 ფენა, პარმეზანი, ყველის სოუსი, სპეც სოუსი, ბურგერის ფუნთუშა, აისბერგი, მჟავე კიტრი, მიმოლეტე.', price: '19.80₾', id: 17 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgGladiator, name: 'გლადიატორი', description: 'ხორცი 750გრ, ბეკონი 4 ფენა, ყველი ჩედარი, სპეც სოუსი, მჟავე კიტრი, ხახვი (საფერავში დამარინადებული), აისბერგი, ბურგერის ფუნთუშა, ყველის სოუსი.', price: '42.50₾', id: 18 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgBigMax,    name: 'დიდი აფეთქება', description: '300 გრ. საქონლის ხორცი, ყველი პარმეზანი, ყველი ემენტალი, ყველი ჩედარი, ჰალაპენიოს სოუსი, სპეც სოუსი, აისბერგი, ხახვი (საფერავში დამარინადებული), ბურგერის ფუნთუშა, მჟავე კიტრი, ორეგანო.', price: '33.80₾', id: 19 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgSmesh2X,   name: 'სმეშ ბურგერი 2X', description: 'საქონლის ხორცი 300 გრ, ყველი ჩედარი, სპეც სოუსი, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერგი, ბურგერის ფუნთუშა.', price: '29.60₾', id: 20 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgSmesh4X,   name: 'სმეშ ბურგერი 4X', description: 'საქონლის ხორცი 600 გრ., ყველი ჩედარი, სპეც სოუსი, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერგი, ბურგერის ფუნთუშა.', price: '37.80₾', id: 21 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgLionRoar,  name: 'ლომის ღრიალი', description: 'დასმეშილი ბურგერის ფუნთუშა, საქონლის დასმეშილი ხორცი 600 გრ, მჟავე კიტრი, აისბერგი, საფერავში დამარინადებული ხახვი, სპეც სოუსი, 8 ფენა ჩედარის ყველი, მოცარელა, პარმეზანი.', price: '45.80₾', id: 22 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgBlackLion, name: 'შავი ლომი', description: 'საქონლის ხორცი 450გრ, ბურგერის ფუნთუშა, ბეკონი 5 ფენა, ყველი ჩედარი 5 ფენა, პარმეზანი, მოცარელა, კიტრი, საფერავში დამარინადებული ხახვი, აისბერგი, სპეც სოუსი.', price: '42.50₾', id: 23 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgAsteroid,  name: 'ასტეროიდი', description: 'საქონლის ხორცი 900 გრ., ბურგერის ფუნთუშა, სპეც სოუსი, ბარბექიუს სოუსი, ყველის სოუსი, ყველი ჩედარი, ყველი პარმეზანი, ყველი მიმოლეტე, ბეკონი 3 ფენა, მჟავე კიტრი, ხახვი (საფერავის მარინადში), აისბერგი.', price: '44.80₾', id: 24 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.imgCake,      name: 'ბეკონ ბურგერის ტორტი', description: 'საქონლის ხორცი 2 კგ, ყველის სოუსი, ბეკონი, ბურგერის გიგანტური ფუნთუშა, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერიგი, ყველი ჩედარი, სპეც სოუსი. მოყვება: კარტოფილი ფრი, ყველის სოუსი, კეტჩუპი, ჰალაპენიო.', price: '165.00₾', id: 25 },
    { tabs: ['ყველა', 'ბურგერები'], imageUrl: this.img5Cheese,   name: 'ხუთი ყველის ბურგერის ტორტი', description: 'საქონლის ხორცი 2 კგ., ბურგერის გიგანტური ფუნთუშა, საფერავში დამარინადებული ხახვი, მჟავე კიტრი, აისბერგი, ყველი ჩედარი, ყველი პარმეზანი, ყველი მიმოლეტე, ყველი მოცარელა, ყველის სოუსი, სპეც სოუსი. მოყვება: კარტოფილი ფრი, ყველის სოუსი, კეტჩუპი, ჰალაპენიო.', price: '175.00₾', id: 26 },

    // ============= გარნირები & სოუსები =============
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgLionSauceNag, name: 'ლომების სოუსი ნაგეთსით', description: 'კარტოფილი ფრი, ყველის სოუსი, ნაგეთსი, აისბერგი, ჰალაპენიო.', price: '21.80₾', id: 27 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgExtra,        name: 'ლომების სოუსი ექსტრა', description: 'ფრი, ყველის სოუსი, ჰალაპენიუ, საქონლის ხორცი, ბეკონი, ხახვი, პარმეზანი, ჩედარი, აისბერი.', price: '29.80₾', id: 28 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgSauceBacon,   name: 'ლომების სოუსი ბეკონით', description: 'კარტოფილი ფრი, ყველის სოუსი, ბეკონი, აისბერგი, ჰალაპენიო.', price: '19.80₾', id: 29 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesHalap,   name: 'კარტოფილი ფრი ჰალაპენიუთი და ყველის სოუსით (250 გრ.)', description: 'კარტოფილი ფრი, ყველის სოუსი, ჰალაპენიო.', price: '14.80₾', id: 30 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesSpec,    name: 'სპეც. კარტოფილი ფრი (400 გრ.)', description: 'სპეციალური კარტოფილი ფრი.', price: '7.50₾', id: 31 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesBigNag,  name: 'დიდი ფრი ნაგეთსით', description: 'დიდი კარტოფილი ფრი ნაგეთსით.', price: '28.00₾', id: 32 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesBig,     name: 'დიდი ფრი', description: 'დიდი ზომის კარტოფილი ფრი.', price: '19.80₾', id: 33 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesMed,     name: 'საშუალო კარტოფილი ფრი', description: 'საშუალო ზომის კარტოფილი ფრი.', price: '7.80₾', id: 34 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgFriesSmall,   name: 'პატარა კარტოფილი ფრი', description: 'პატარა ზომის კარტოფილი ფრი.', price: '6.80₾', id: 35 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgCheeseSauce,  name: 'ყველის სოუსი', description: 'ყველის სოუსი.', price: '5.00₾', id: 36 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgCheeseSauce,  name: 'დიდი ყველის სოუსი', description: 'დიდი ზომის ყველის სოუსი.', price: '15.00₾', id: 37 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgBbqSauce,     name: 'ბარბექიუ სოუსი 30gr', description: 'ბარბექიუ სოუსი.', price: '2.50₾', id: 38 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgHalapeno30,   name: 'ჰალაპენიო 30gr', description: 'ჰალაპენიო.', price: '1.50₾', id: 39 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgCheeseBaconS, name: 'პატარა ყველის სუსი ბეკონით', description: 'პატარა ყველის სუსი ბეკონით.', price: '7.00₾', id: 40 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgCheeseBaconM, name: 'საშუალო ყველის სუსი ბეკონით', description: 'საშუალო ზომის ყველის სუსი ბეკონით.', price: '15.00₾', id: 41 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgCheeseBaconL, name: 'დიდი ყველის სუსი ბეკონით', description: 'დიდი ზომის ყველის სუსი ბეკონით.', price: '18.00₾', id: 42 },
    { tabs: ['ყველა', 'გარნირები & სოუსები'], imageUrl: this.imgSweetHot,     name: 'ტკბილ–ცხარე სოუსი ექსტრა', description: 'ტკბილ-ცხარე სოუსი.', price: '2.50₾', id: 43 },

    // ============= სასმელები =============
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgCola,      name: 'კოკა კოლა (0.33)', description: 'კოკა კოლა 0.33 ლ.', price: '3.50₾', id: 44 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgCola,      name: 'ჩამოსასხმელი კოკა–კოლა (0.4)', description: 'ჩამოსასხმელი კოკა-კოლა 0.4 ლ.', price: '4.00₾', id: 45 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgCola,      name: 'კოკა კოლა ზერო (0.33)', description: 'კოკა კოლა ზერო 0.33 ლ.', price: '3.50₾', id: 46 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgFanta,     name: 'ფანტა (0.33)', description: 'ფანტა 0.33 ლ.', price: '3.50₾', id: 47 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgRedBull,   name: 'რედბული / red bull (0.25)', description: 'რედბული 0.25 ლ.', price: '6.00₾', id: 48 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgBlackBeer, name: 'შავი ლომი APA (0.5)', description: 'შავი ლომი APA 0.5 ლ.', price: '9.50₾', id: 49 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgKombucha,  name: 'კომბუჩა', description: 'ჩვენს წელთაღრიცხვამდე არსებული იაპონური ტექნოლოგიით დამზადებული არაპასტერიზებული, ფერმენტირებული, შუშხუნა სასმელი.', price: '8.00₾', id: 50 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgLikani,    name: 'ლიკანი 0.6', description: 'ლიკანი 0.6 ლ.', price: '3.00₾', id: 51 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgLikani,    name: 'მინერ. წყალი მთის 0.5', description: 'მინერალური წყალი მთის 0.5 ლ.', price: '2.00₾', id: 52 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgLikani,    name: 'ბორჯომი 0.5', description: 'ბორჯომი 0.5 ლ.', price: '3.50₾', id: 53 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgRefresh,   name: 'რე-ფრეშის ლიმონათი', description: 'რე-ფრეშის ლიმონათი.', price: '7.00₾', id: 54 },
    { tabs: ['ყველა', 'სასმელები'], imageUrl: this.imgOrangeFr,  name: 'ფორთოხლის ფრეში', description: 'ახალი ფორთოხლის წვენი.', price: '11.00₾', id: 55 },

    // ============= ტკბილეული =============
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgTiramisu,   name: 'ტირამისუ', description: 'ტირამისუ.', price: '10.00₾', id: 56 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgFahlava,    name: 'Lion’s Sweets / ჩეხური ფახლავა', description: 'ჩეხური ფახლავა.', price: '7.80₾', id: 57 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgSigara,     name: 'Papyrus / სიგარა ნიგვზიანი', description: 'სიგარა ნიგვზიანი.', price: '5.00₾', id: 58 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgCafeStr,    name: 'Cafe Mondial — Strawberry', description: 'Cafe Mondial Strawberry.', price: '18.00₾', id: 59 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgCafeChoc,   name: 'Cafe Mondial — Chocolate', description: 'Cafe Mondial Chocolate.', price: '18.00₾', id: 60 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgEspresso,   name: 'ესპრესო', description: 'ესპრესო.', price: '5.50₾', id: 61 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgAmericano,  name: 'ამერიკანო', description: 'ამერიკანო.', price: '5.50₾', id: 62 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgAmericano,  name: 'კაპუჩინო', description: 'კაპუჩინო.', price: '6.50₾', id: 63 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgAmericano,  name: 'ლატე', description: 'ლატე.', price: '6.50₾', id: 64 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgIcedCoffee, name: 'ცივი ყავა ნაყინით', description: 'ცივი ყავა ნაყინით.', price: '10.00₾', id: 65 },
    { tabs: ['ყველა', 'ტკბილეული'], imageUrl: this.imgLatteMac,   name: 'ლატე მაკიატო', description: 'ლატე მაკიატო.', price: '6.50₾', id: 66 },
  ];

  get filteredItems(): MenuItem[] {
    if (this.activeTab === 'ყველა') return this.menuItems;
    return this.menuItems.filter(item => item.tabs.includes(this.activeTab));
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  trackById(_: number, item: MenuItem): number {
    return item.id;
  }
}