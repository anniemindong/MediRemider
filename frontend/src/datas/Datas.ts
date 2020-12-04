import {
  DoctorModel,
  // CampaignModel,
  // EventModel,
  DepartmentModel,
  // NewsPostModel,
  ImageModel,
  MediaModel
} from "../models";

const reviewModels = () =>
  new Array(Math.floor(Math.random() * 10 + 5)).fill({
    user: {
      fullName: "Burcu YILDIZ",
      imageUrl:
        "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/reviewer1.jpg",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  });

export const doctorsList: DoctorModel[] = [
  {
    fullName: "Dr. Mehmet ENGÜR",
    title: "Dental Hygienist",
    isOnline: false,
    rating: 4.6,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor3.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  },

];


const departmentImages: ImageModel[] = [
  {
    description: "Description 1",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_1.jpg"
  },
  {
    description: "Description 2",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_2.jpg"
  },
  {
    description: "Description 3",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_3.jpg"
  },
  {
    description: "Description 4",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment2.png"
  },
  {
    description: "Description 5",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment3.jpg"
  }
];

export const departmentList: DepartmentModel[] = [
  {
    title: "Vicks Cold & Flu Relief",
    imageUrl:
      "https://i.loli.net/2020/11/18/Z7SOAy8CVdh6MD1.jpg",
    // "https://i.loli.net/2020/11/18/LnupSGRzJAQKBE8.jpg",
    // "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/coupon1.jpg",
    htmlContent:
      "<p>Vicks DayQuil SEVERE Cold & Flu provides max-strength, non-drowsy, daytime relief for your worst cold and flu symptoms. DayQuil SEVERE relieves headache, fever, sore throat, minor aches & pains, nasal congestion, sinus pressure, and cough. Contains acetaminophen.</p><p>Vicks NyQuil Cold & Flu delivers powerful nighttime relief for your worst cold and flu symptoms so that you can get the rest you need. Fight symptoms such as cough, headache, fever, sore throat, minor aches and pains, sneezing, runny nose. Contains acetaminophen.</p>",
    shortDescription:
      "Buy 2, get 1 FREE",
    // couponServices,
    // newsPosts,
    images: departmentImages
  },
  {
    // title: "Pepto",
    title: "Pepto Digestive Relief",
    imageUrl:
      "https://i.loli.net/2020/11/18/NteYKsmAul9Jpi2.jpg",
    // "https://i.loli.net/2020/11/18/rXl3A2x7wCKWeGu.jpg",
    // "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/coupon2.jpg",
    htmlContent:
      "<p>Pepto Bismol Ultra Original Flavor. When you have a sour stomach, Pepto's formula coats your stomach and provides fast relief from nausea, heartburn, indigestion, upset stomach, and diarrhea. Pepto Bismol ULTRA has got you covered. Order online today or find it in the Immediate Heartburn Relief section.</p>",
    shortDescription:
      "25% OFF",
    // couponServices,
    // newsPosts,
    images: departmentImages
  },
  {
    title: "Motrin Fever Reducer",
    imageUrl:
      "https://i.loli.net/2020/11/18/xhsWOrq5Y3bLoca.jpg",
    // "https://i.loli.net/2020/11/18/dfQ6cRmDkAj31h4.jpg",
    // "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/coupon3.jpg",
    htmlContent:
      "<p>Get relief from minor aches and pains with Motrin IB 200mg ibuprofen tablets. Safe and effective when used as directed, these ibuprofen tablets temporarily reduce fever and relieve minor aches and pains due to the common cold and flu, headache, muscular aches, minor pain of arthritis, toothache, backache, and menstrual cramps. Each Motrin IB tablet contains 200 milligrams of ibuprofen.</p>",
    shortDescription:
      "$2 OFF",
    // couponServices,
    // newsPosts,
    images: departmentImages
  },
  {
    title: "Neosporin Infection Protection",
    imageUrl:
      "https://i.loli.net/2020/11/18/PVyuzQjw2IvOZMh.jpg",
    // "https://i.loli.net/2020/11/18/uzs9EA53lNabOFV.jpg",
    // "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/coupon4.jpg",
    htmlContent:
      "<p>Neosporin + Pain Relief Dual Action Ointment provides 24-hour infection protection and helps soothe painful minor cuts, scrapes, and burns. Formulated for first aid wound care, the antibiotic ointment contains bacitracin zinc, neomycin sulfate and polymyxin B sulfate to help fight infection for 24 hours. The first aid ointment is also formulated with pramoxine hydrochloride to help soothe and reduce pain from minor wounds for maximum-strength relief. From the #1 doctor-recommended brand, this antibiotic and pain relief ointment provides soothing infection protection without any sting. To treat minor wounds, simply apply a small amount of the topical skin ointment on the affected area one to three times daily and cover with a Band-Aid Brand Adhesive Bandage.</p>",
    shortDescription:
      "15% OFF",
    // couponServices,
    // newsPosts,
    images: departmentImages
  },
  {
    title: "Airborne Immune Support ",
    imageUrl:
      "https://i.loli.net/2020/11/18/Lp63NoMXiDIlS8n.jpg",
    // "https://i.loli.net/2020/11/18/rkblGXozp6tmfKW.jpg",
    // "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/coupon5.jpg",
    htmlContent:
      "<p>Airborne Effervescent Tablets provide immune support in a great-tasting formula*. Each serving (1 tablet) delivers a blast of 1000 mg of Vitamin C plus 13 vitamins, minerals, and herbs, including Echinacea and ginger. Adults and Children 14 years and older, simply drop 1 tablet in a glass of water or favorite beverage, let dissolve (about 1 minute) and drink. Can repeat every 3-4 hours, up to 3 times per day. Children 12-13 years old, repeat every 3-4 hours as necessary, up to 2 times per day; no more than 2 tablets. Gluten Free. Visit AirborneHealth website to learn more. *These Statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p>",
    shortDescription:
      "Spend $50 Save $15",
    // couponServices,
    // newsPosts,
    images: departmentImages
  }
];

