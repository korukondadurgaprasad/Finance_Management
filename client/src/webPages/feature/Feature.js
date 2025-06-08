// import React from 'react';
// import './Feature.css';
// import header from '../../Assets/header.jpg';
// import Budget from '../../Assets/budget.jpg';
// import Finan from '../../Assets/Finance manage.jpg';
// import Invest from '../../Assets/investment.jpg';
// import Saving from '../../Assets/save.jpg';
// import Stock from '../../Assets/stock.jpg';


// const FeaturePage = () => {
//   return (
//     <div className="financeHive_missionVisionWrapper_container">
//       {/* Top image section */}
//       <div className="financeHive_headerImage_container">
//         <img src={header} alt="Financial tools graphic" className="financeHive_headerImage_img" />
//       </div>

//       {/* Added text below the top image */}
//       <div className="financeHive_introSection_container">
//         <p className="financeHive_introSection_paragraph">
//         "Here, we showcase our diverse range of financial management services designed to make your financial journey effortless and efficient. Explore our comprehensive tools that help you stay in control of your finances. Dive into our investment planning services and gain actionable insights to grow your wealth. Let's build a smarter financial future together! Our tailored solutions cater to all your financial needs, from budgeting to long-term savings. Whether you're looking to manage your daily expenses or plan for retirement, we've got you covered. With our intuitive platforms, you'll be empowered to make informed decisions. Our expert advisors are always ready to assist you in achieving your financial goals. Join us today and take the first step towards securing a prosperous future."
//         </p>
//       </div>

//       {/* Content section */}
//       <div className="financeHive_contentSection_wrapper">
//         <div className="financeHive_missionSection_container">
//           <div className="financeHive_sectionHeader_container">
//             <div className="financeHive_sectionHeader_verticalLine"></div>
//             <h2 className="financeHive_sectionHeader_title">Finance Management</h2>
//           </div>
//           <div className="financeHive_missionSection_content">
//             <p className="financeHive_content_paragraph">
//             Finance management involves planning, organizing, and controlling financial resources to achieve personal or organizational goals. Effective financial management ensures stability, growth, and the ability to handle uncertainties.
//             Analyze income, expenses, and savings.
//             Create a comprehensive financial plan.
//             Allocate funds for investments, emergencies, and future goals.
//             Review and adjust plans periodically based on performance and market conditions.
//             </p>
//             <img src={Finan} alt="Satellite in space" className="financeHive_missionSection_image" />
//           </div>
//         </div>

//         <div className="financeHive_visionSection_container">
//           <div className="financeHive_visionSection_content">
//             <img src={Stock} alt="Satellite in space" className="financeHive_visionSection_image" />
//             <div className="financeHive_visionSection_textContainer">
//               <div className="financeHive_sectionHeader_container">
//                 <div className="financeHive_sectionHeader_verticalLine"></div>
//                 <h2 className="financeHive_sectionHeader_title">Stock Marketing
//                 </h2>
//               </div>
//               <p className="financeHive_content_paragraph">
//               The stock market is a platform where buyers and sellers trade shares of publicly listed companies. It plays a vital role in wealth creation and economic growth. Understanding market dynamics and trends can help investors make informed decisions.
//               Learn the basics of stock market operations.
//               Open a brokerage account.
//               Research companies and market trends.
//               Invest in diverse stocks and monitor their performance.</p>
//             </div>
//           </div>
//         </div>

//         {/* New "Money" Section */}
//         <div className="financeHive_moneySection_container">
//           <div className="financeHive_sectionHeader_container">
//             <div className="financeHive_sectionHeader_verticalLine"></div>
//             <h2 className="financeHive_sectionHeader_title">Budgeting</h2>
//           </div>
//           <div className="financeHive_moneySection_content">
//             <p className="financeHive_content_paragraph">
//             Budgeting is the foundation of personal finance. It involves creating a plan to allocate income toward expenses, savings, and investments. A well-crafted budget ensures financial stability and helps achieve long-term goals.
//             Assess your income sources,
//             Categorize expenses (fixed, variable, discretionary),
//             Allocate funds for savings and investments before spending,
//             Monitor and adjust the budget monthly.
//             </p>
//             <img src={Budget} alt="Money Management" className="financeHive_moneySection_image" />
//           </div>
//         </div>

//         {/* Fourth Section (Image and Text Swapped) */}
//         <div className="financeHive_fourthSection_container">
//           <div className="financeHive_sectionHeader_container">
//             <div className="financeHive_sectionHeader_verticalLine"></div>
//             <h2 className="financeHive_sectionHeader_title">Investments</h2>
//           </div>
//           <div className="financeHive_fourthSection_content">
//             <img src={Invest} alt="Fourth Section" className="financeHive_fourthSection_image" />
//             <p className="financeHive_content_paragraph">
//             Investments allow your money to grow by generating returns over time. They can range from stocks and bonds to mutual funds and real estate. Strategic investing requires balancing risks and potential rewards.
//             Define your financial goals and risk tolerance.
//             Research various investment options.
//             Diversify your portfolio.
//             Monitor performance and rebalance periodically.</p>
//           </div>
//         </div>

//         {/* Fifth Section (Image and Text Swapped) */}
//         <div className="financeHive_fifthSection_container">
//           <div className="financeHive_sectionHeader_container">
//             <div className="financeHive_sectionHeader_verticalLine"></div>
//             <h2 className="financeHive_sectionHeader_title">Savings </h2>
//           </div>
//           <div className="financeHive_fifthSection_content">
//             <div className="financeHive_fifthSection_textContainer">
//               <p className="financeHive_content_paragraph">
//               Savings ensure financial security during emergencies and support future aspirations. Building a habit of consistent saving helps manage unforeseen circumstances and meet specific goals like buying a house or traveling.
//               Set a savings goal,
//               Open a dedicated savings account,
//               Automate monthly savings from your income,
//               Review progress and increase contributions when possible.              </p>
//             </div>
//             <img src={Saving} alt="Fifth Section" className="financeHive_fifthSection_image" />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FeaturePage;


import React from 'react';
import './Feature.css';
import header from '../../Assets/header.jpg';
import Budget from '../../Assets/budget.jpg';
import Finan from '../../Assets/Finance manage.jpg';
import Invest from '../../Assets/investment.jpg';
import Saving from '../../Assets/save.jpg';
import Stock from '../../Assets/stock.jpg';


const FeaturePage = () => {
  return (
    <div className="financeHive_missionVisionWrapper_container">
      {/* Top image section */}
      <div className="financeHive_headerImage_container">
        <img src={header} alt="Financial tools graphic" className="financeHive_headerImage_img" />
      </div>

      {/* Added text below the top image */}
      <div className="financeHive_introSection_container">
        <p className="financeHive_introSection_paragraph">
        "Here, we showcase our diverse range of financial management services designed to make your financial journey effortless and efficient. Explore our comprehensive tools that help you stay in control of your finances. Dive into our investment planning services and gain actionable insights to grow your wealth. Let's build a smarter financial future together! Our tailored solutions cater to all your financial needs, from budgeting to long-term savings. Whether you're looking to manage your daily expenses or plan for retirement, we've got you covered. With our intuitive platforms, you'll be empowered to make informed decisions. Our expert advisors are always ready to assist you in achieving your financial goals. Join us today and take the first step towards securing a prosperous future."
        </p>
      </div>

      {/* Content section */}
      <div className="financeHive_contentSection_wrapper">
        <div className="financeHive_missionSection_container">
          <div className="financeHive_sectionHeader_container">
            <div className="financeHive_sectionHeader_verticalLine"></div>
            <h2 className="financeHive_sectionHeader_title">Finance Management</h2>
          </div>
          <div className="financeHive_missionSection_content">
            <p className="financeHive_content_paragraph">
            Finance management involves planning, organizing, and controlling financial resources to achieve personal or organizational goals. Effective financial management ensures stability, growth, and the ability to handle uncertainties.
            Analyze income, expenses, and savings.
            Create a comprehensive financial plan.
            Allocate funds for investments, emergencies, and future goals.
            Review and adjust plans periodically based on performance and market conditions.
            </p>
            <img src={Finan} alt="Satellite in space" className="financeHive_missionSection_image" />
          </div>
        </div>

        <div className="financeHive_visionSection_container">
              <div className="financeHive_sectionHeader_container">
                <div className="financeHive_sectionHeader_verticalLine"></div>
                <h2 className="financeHive_sectionHeader_title">Stock Marketing
                </h2>
              </div>
              <div className="financeHive_visionSection_content">
              <p className="financeHive_content_paragraph">
              The stock market is a platform where buyers and sellers trade shares of publicly listed companies. It plays a vital role in wealth creation and economic growth. Understanding market dynamics and trends can help investors make informed decisions.
              Learn the basics of stock market operations.
              Open a brokerage account.
              Research companies and market trends.
              Invest in diverse stocks and monitor their performance.</p>
              <img src={Stock} alt="Satellite in space" className="financeHive_visionSection_image" />
          </div>
              
        </div>

        {/* New "Money" Section */}
        <div className="financeHive_moneySection_container">
          <div className="financeHive_sectionHeader_container">
            <div className="financeHive_sectionHeader_verticalLine"></div>
            <h2 className="financeHive_sectionHeader_title">Budgeting</h2>
          </div>
          <div className="financeHive_moneySection_content">
            <p className="financeHive_content_paragraph">
            Budgeting is the foundation of personal finance. It involves creating a plan to allocate income toward expenses, savings, and investments. A well-crafted budget ensures financial stability and helps achieve long-term goals.
            Assess your income sources,
            Categorize expenses (fixed, variable, discretionary),
            Allocate funds for savings and investments before spending,
            Monitor and adjust the budget monthly.
            </p>
            <img src={Budget} alt="Money Management" className="financeHive_moneySection_image" />
          </div>
        </div>

        {/* Fourth Section (Image and Text Swapped) */}
        <div className="financeHive_fourthSection_container">
          <div className="financeHive_sectionHeader_container">
            <div className="financeHive_sectionHeader_verticalLine"></div>
            <h2 className="financeHive_sectionHeader_title">Investments</h2>
          </div>
          <div className="financeHive_fourthSection_content">
            <p className="financeHive_content_paragraph">
            Investments allow your money to grow by generating returns over time. They can range from stocks and bonds to mutual funds and real estate. Strategic investing requires balancing risks and potential rewards.
            Define your financial goals and risk tolerance.
            Research various investment options.
            Diversify your portfolio.
            Monitor performance and rebalance periodically.</p>
            <img src={Invest} alt="Fourth Section" className="financeHive_fourthSection_image" />
            
          </div>
        </div>

        {/* Fifth Section (Image and Text Swapped) */}
        <div className="financeHive_fifthSection_container">
          <div className="financeHive_sectionHeader_container">
            <div className="financeHive_sectionHeader_verticalLine"></div>
            <h2 className="financeHive_sectionHeader_title">Savings </h2>
          </div>
          <div className="financeHive_fifthSection_content">
            <div className="financeHive_fifthSection_textContainer">
              <p className="financeHive_content_paragraph">
              Savings ensure financial security during emergencies and support future aspirations. Building a habit of consistent saving helps manage unforeseen circumstances and meet specific goals like buying a house or traveling.
              Set a savings goal,
              Open a dedicated savings account,
              Automate monthly savings from your income,
              Review progress and increase contributions when possible.              </p>
            </div>
            <img src={Saving} alt="Fifth Section" className="financeHive_fifthSection_image" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturePage;