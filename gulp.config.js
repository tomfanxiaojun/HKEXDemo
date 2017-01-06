module.exports = function () {
    let config = {

        megaMenuHighlights: {
            optionOne: [{
                title: 'HKEX News',
                content:'View listed company information and disclosures',
                url: 'HKEX_News.jpg'
            }, {
                title: 'News Alert',
                content:'Subscribe to our News Alert service',
                url: 'News_Alert.png'
            }, {
                title: 'China Stock Markets Web',
                content:'Find information on the Mutual Market',
                url: 'China_Stock_Markets_Web.png'
            }],
            optionTwo: [{
                title: 'Find a Partner',
                content:'Search our directory to find a broker, clearer, information vendor or technology vendor',
                url: 'Find_a_Partner.png'
            },{
                title: 'New RMB Currency Pairs',
                content:'Launched 30 <sup>th</sup> May 2016',
                url: 'New_RMB_Currency_Pairs.jpg'
            }, {
                title: 'OTC Cross Currency Swaps Clearing',
                content:'Discover new product offering from OTC Clear',
                url: 'OTC_Cross_Currency_Swaps_Clearing.png'
            }],
            optionThree: [{
                title: 'Circulars & Notices',
                content:'Notices for exchange and clearing house participants',
                url: 'Circulars_and_Notices.jpg'
            },{
                title: 'Become a Participant',
                content:'Step-by-step guide to becoming a participant on our market',
                url: 'Become_a_Participant.jpg'
            }, {
                title: '2017 Trading Calendar',
                content:'Download the official HKEX trading calendar for 2017',
                url: '2017_Trading_Calendar.png'
            }],
            optionFour: [{
                title: 'Market Open Ceremony',
                content:'A unique experience for listed companies and industry associations',
                url: 'Market_Open_Ceremony.jpg'
            },{
                title: 'Guide to Listing',
                content:'Download HKEX official guide to getting listed in Hong Kong',
                url: 'Guide_to_Listing.png'
            }, {
                title: 'Interactive Listing Rules',
                content:'Browse The Stock Exchange of Hong Kong listing rules by topic',
                url: 'Interactive_Listing_Rules.jpg'
            }],
            optionFive: [{
                title: 'Charles Li Direct',
                content:'Latest blog post from our Chief Executive',
                url: 'Charles_Li_Direct.jpg'
            },{
                title: 'Circulars & Notices',
                content:'Notices for exchange and clearing house participants',
                url: 'Circulars_and_Notices.jpg'
            }, {
                title: 'Shenzhen Connect',
                content:'Another milestone for Stock Connect',
                url: 'Shenzhen_Connect.png'
            }]
        },
        becomeParticipant: {
            title: 'Exchange and Clearing House Participants',
            subTitle: '',
            headerText: 'HOW TO BECOME OUR PARTICIPANT',
            className1: 'active',
            className2: '',
            className3: ''
        },
        findPartner: {
            title: 'Exchange and Clearing House Participants',
            subTitle: '',
            headerText: 'HOW TO BECOME OUR PARTICIPANT',
            className1: '',
            className2: 'active',
            className3: ''
        },

        listing: {
            listingProcess: {
                title: 'Listing',
                subTitle: 'Getting Started',
                headerText: 'LISTING ON THE MAINBOARD',
                className1: '',
                className2: 'active',
                className3: ''
            },
            listingCommittee: {
                title: 'Listing',
                subTitle: 'How We Regulate \\',
                headerText: 'LISITNG COMMITTEE',
                className1: '',
                className2: '',
                className3: 'active'
            },
            listingRulesGuidance: {
                title: 'Listing',
                subTitle: 'Rules & Guidance',
                headerText: 'OVERVIEW',
                className1: '',
                className2: '',
                className3: 'active'
            },
            listingGettingStarted: {
                title: 'Listing',
                subTitle: '',
                headerText: 'GETTING STARTED',
                className1: '',
                className2: 'active',
                className3: ''
            },
            listingWhyHKList: {
                title: 'Listing',
                subTitle: '',
                headerText: 'WHY LIST IN HONG KONG',
                className1: 'active',
                className2: '',
                className3: ''
            }
        },
        news:{
            newsRelease:{
                title: 'News',
                subTitle: '',
                headerText: 'News Release',
                className1: 'active',
                className2: '',
                className3: '',
                className4: ''
            }
        },


        filterConditions: {
            etpProducts: [
              {
                filterType: 'PRODUCT TYPE',
                options: [{
                  value:'ETF',
                  id:'eft',
                  groupName: 'Product Type',
                },{
                  value:'Leveraged & Inversed Product (L&I)',
                  id:'leveraged',
                  groupName: 'Product Type'
                }
              ]
              },
              {
                filterType: 'PROPERTY',
                options: [{
                  value:'Physical',
                  id:'physical',
                  groupName: 'Property'
                },{
                  value:'Synthetic',
                  id:'synthetic',
                  groupName: 'Property'
                },{
                  value:'Future Based',
                  id:'future-based',
                  groupName: 'Property'
                }
              ]
              }
            ],
            advanceSearch:[{
              filterType: 'Search within:',
              options: [{
                value:'Listing',
                id:'Listing',
                groupName: 'Property'
              },{
                value:'Products',
                id:'Products',
                groupName: 'Property'
              },
              {
                value:'News',
                id:'News',
                groupName: 'Property'
              },{
                value:'Services',
                id:'Services',
                groupName: 'Property'
              },{
                value:'FAQ',
                id:'FAQ',
                groupName: 'Property'
              },{
                value:'Market Data',
                id:'Market_Data',
                groupName: 'Property'
              },
             ]
            }
          ],
            circulars: [{
                filterType: 'ISSUED BY',
                options: [{
                  value:'The Stock Exchange of Hong Kong Limited (SEHK)',
                  id:'SEHK',
                  displayValue:'SEHK',
                  groupName: 'ISSUED BY'
                },{
                  value:'Hong Kong Securities Clearing Company Limited (HKSCC)',
                  id:'HKSCC',
                  displayValue:'HKSCC',
                  groupName: 'ISSUED BY'
                },{
                  value:'Hong Kong Futures Exchange Limited (HKFE)',
                  id:'HKFE',
                  displayValue:'HKFE',
                  groupName: 'ISSUED BY'
                },{
                  value:'HKFE Clearing Corporation Limited (HKCC)',
                  id:'HKCC',
                  displayValue:'HKCC',
                  groupName: 'ISSUED BY'
                },{
                  value:'The SEHK Options Clearing House Limited (SEOCH)',
                  id:'SEOCH',
                  displayValue:'SEOCH',
                  groupName: 'ISSUED BY'
                },{
                  value:'OTC Clearing Hong Kong Limited (OTC Clear)',
                  id:'OTC-Clear',
                  displayValue:'OTC Clear',
                  groupName: 'ISSUED BY'
                }]
              },
              {
                filterType: 'THEME',
                options: [{
                  value:'Stock Connect related circulars',
                  id:'Stock',
                  groupName: 'THEME'
                },{
                  value:'IPO',
                  id:'IPO',
                  groupName: 'THEME'
                },{
                  value:'Tag3',
                  id:'Tag3',
                  groupName: 'THEME'
                }
              ]
              }
            ],
            resultFilterCheckbox: [
              {
                filterType: 'Sections',
                options: [{
                  value:'Market Data (15)',
                  id:'marketData',
                  displayValue: 'Market Data',
                  groupName: 'Sections'
                },{
                  value:'Products (2)',
                  id:'products',
                  displayValue: 'Products',
                  groupName: 'Sections'
                },{
                  value:'Services (30)',
                  id:'services',
                  displayValue: 'Services',
                  groupName: 'Sections'
                },{
                  value:'Listing (9)',
                  id:'listing',
                  displayValue: 'Listing',
                  groupName: 'Sections'
                },{
                  value:'News (5)',
                  id:'news',
                  displayValue: 'News',
                  groupName: 'Sections'
                },{
                  value:'FAQ (1)',
                  id:'faq',
                  displayValue: 'FAQ',
                  groupName: 'Sections'
                }]
              },
            ],
            newsReleases: [{
                filterType: 'NEWS CATEGORY',
                options: [{
                  value:'Regulatory',
                  id:'regulatory',
                  displayValue:'Regulatory',
                  groupName: 'NEWS CATEGORY'
                },{
                  value:'Stock Connect',
                  id:'stockConnect',
                  displayValue:'Stock Connect',
                  groupName: 'NEWS CATEGORY'
                },{
                  value:'Listing',
                  id:'listing',
                  displayValue:'Listing',
                  groupName: 'NEWS CATEGORY'
                },{
                  value:'Market Operations',
                  id:'marketOperations',
                  displayValue:'Market Operations',
                  groupName: 'NEWS CATEGORY'
                },{
                  value:'New Products',
                  id:'newProducts',
                  displayValue:'New Products',
                  groupName: 'NEWS CATEGORY'
                },{
                  value:'Infrastructure',
                  id:'infrastructure',
                  displayValue:'Infrastructure',
                  groupName: 'NEWS CATEGORY'
                }]
              }
            ]
        },


        monthlyBulletin: {
            title: 'Market Data',
            subTitles: [' Statistics Research','Securities Market Statistics'],
            headerText: 'MONTHLY BULLETIN'
          },
        monthlyHighlight: {
            title: 'Market Data',
            subTitles: [' Statistics Research'],
            headerText: 'STATISTICS REPORTS'
          },
        chinaDimension: {
            title: 'Market Data',
            subTitles: [' Statistics Research','Securities Market Statistics'],
            headerText: 'CHINA DIMENSION'
          },
        etpIssuers: {
            title: 'Products',
            subTitles: ['Securities','Exchange Traded Products'],
            headerText: 'ISSUERS'
          },
        etpProducts: {
              title: 'Products',
              subTitles: ['Securities','Exchange Traded Products'],
              headerText: 'PRODUCTS'
          },
        circulars: {
          title: 'News',
          headerText: 'CIRCULARS'
        },
        circularsBreadcrumb: {
          title: 'News',
          headerText: 'Circulars'
        },
        listingBreadcrumb: {
          whyHKlist:{
            title: 'Listing',
            headerText:'Why List in Hong Kong'
          },
          rulesGuidance:{
            title: 'Listing',
            subTitle:'How We Regulate',
            headerText: 'Listing Committee'
          },
          gettingStarted:{
            title: 'Listing',
            headerText:'Getting Started'
          }
        },
        newsBreadcrumb: {
            newsRelease: {
              title: 'News',
              headerText:'News Release',
            }
        },
        monthlyBulletinBreadcrumb: {
            title: 'Market Data',
            subTitles: [' Statistics Research','Securities Market Statistics'],
            headerText: 'Monthly Bulletin'
          },
        monthlyHighlightBreadcrumb: {
            title: 'Market Data',
            subTitles: [' Statistics Research'],
            headerText: 'Statistics Reports'
          },
        chinaDimensionBreadcrumb: {
            title: 'Market Data',
            subTitles: [' Statistics Research','Securities Market Statistics'],
            headerText: 'China Dimension'
          },
        etpLiquidityBreadcrumb: {
            title: 'Products',
            subTitles: [' Securities','Exchange Traded Products'],
            headerText: 'Liquidity'
          },
        etpIssuersBreadcrumb: {
            title: 'Products',
            subTitles: ['Securities','Exchange Traded Products'],
            headerText: 'Issuers'
          },
        etpOverView: {
                title: 'Products',
                subTitles: [' Securities','Exchange Traded Product'],
                headerText: 'OVERVIEW'
            },
        contactUs: {
                title: 'Contact us',
                headerText: 'CONTACT US'
            },
          etpLiquidity: {
                  title: 'Products',
                  subTitles: [' Securities','Exchange Traded Product'],
                  headerText: 'Liquidity'
              },
        etpEducation: {
                title: 'Products',
                subTitles: [' Securities','Exchange Traded Product'],
                headerText: 'EDUCATION'
            },


        etpProducts: {
              title: 'Products',
              subTitles: ['Securities','Exchange Traded Products'],
              headerText: 'PRODUCTS'
          },
        calendar: {
            title: 'TBC',
            headerText: 'Calendar'
          },
        nonCmsCalendar: {
          title: 'Home',
          subTitles: ['Statistics & Research', 'Derivatives Market Statistics'],
          headerText: 'DERIVATIVE MARKET STATISTICS'
        },
      nonCmsCalendarBreadCrumb: {
          title: 'Home',
          subTitles: ['Statistics & Research', 'Derivatives Market Statistics']
        }
    };


    return config;

};
