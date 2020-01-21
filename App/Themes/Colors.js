const colors = {
    background: '#fff',
    BrandL: '#B1F9F5',
    BrandM: '#2F6EB7',
    BrandD: '#038ad0',
    BrandXd: '#006c9b',
    BrandLightOpacity: 'rgba(0,178,255, 0.2)',
    SemiLightOpacity: 'rgba(213, 213, 213, 0.6)',
    BrandDarkOpacity: 'rgba(23,30,39, 0.8)',

    // @new
    Gray1: '#333333',
    Gray2: '#4F4F4F',
    Gray3: '#828282',
    Gray4: '#BDBDBD',
    Gray5: '#E0E0E0',
    Gray6: '#F2F2F2',

    Blue1: '#1E68BF',
    Blue2: '#2D9CDB',
    Blue3: '#56CCF2',

    OrangeD: '#F8A805',

    IndigoD: '#4833CA',
    IndigoM: '#4F4CD5',
    IndigoL: '#6D64D9',

    JauneD: '#FFE978',
    JauneM: '#FFF0A3',
    JauneL: '#FBF2C6',

    YellowD: '#EDBB25',
    YellowM: '#F5C525',
    YellowL: '#F8DE90',

    Green1: '#219653',
    Green2: '#27AE60',
    Green3: '#6FCF97',

    Purple1: '#9B51E0',
    Purple2: '#BB6BD9',

    BabyBlueM: '#CEE5FF',
    BabyBlueL: '#E9F3FF',

    PastelPurple: '#A9A8E7',
    PastelOrange: '#FDB97C',
    PastelOrangeL: '#FDCDA1',

    PastelGreenM: '#A7E3A6',
    PastelGreen: '#A8E7C1',
    PastelPink: '#E7A8DD',
    PastelSkyBlue: '#A8E3E7',
    PastelRed: '#EFA0A0',
    PastelPurplePink: '#C7A8E7',
    PastelPurpleL: '#C9C5F8',

    TealD: '#8DC9BD',
    TealM: '#A5DDD3',

    BrownM: '#BC7A19',

    Black: '#1B1B1B',

    // @legacy
    WhiteM: '#FEFEFE',
    WhiteGreen: '#A7DBCD',
    CardBackground: '#fafbfc',
    CardBackgroundD: '#FAFCFF',

    BlackK: '#333538',
    BlackL: '#3C4857',
    BlackM: '#283444',
    BlackD: '#283444',
    SuperBlack: '#000000',

    BeigeL: '#FCF8EE',
    BeigeM: '#FAF0D5',
    BeigeD: '#F6E0AF',

    FrostXl: '#FBFBFB',
    FrostL: '#F3F6F8',
    FrostM: '#E5E9F2',
    FrostD: '#a8b8ca',
    FrostNav: '#C0CCDA',

    GreyXL: '#D8D8D8',
    GreyL: '#C3C3C3',
    GreyM: '#B4B4B4',
    GreyD: '#8392A6',

    UiRed: '#FF003B',
    UiOrange: '#ff7431',
    UiGreen: '#0FD165',
    WhatsappGreen: '#25D366',

    RedXl: '#FFEAEF',
    RedL: '#f0777a',
    RedM: '#e15054',
    RedD: '#B72F45',
    RedError: '#ff003b',

    GoldL: '#fcd877',
    GoldM: '#ffc71a',
    GoldD: '#eeb417',

    // Daily Goals
    OliveGreen: '#779D1A',
    GreenL: '#22BC92',
    GreenM: '#75B72F',
    GreenD: '#19b35e',

    NavyM: '#4275E6',
    NavyL: '#2344CC',
    NavyD: '#2c4fdd',

    NightL: '#D3CCE5',
    NightM: '#0F144E',

    PurpleL: '#9679ff',
    PurpleM: '#784fff',
    PurpleD: '#842FB7',

    OceanL: '#76e4e8',
    OceanM: '#3dd2d7',
    OceanD: '#28aaaf',

    CoralL: '#fe6a5e',
    CoralM: '#ff6559',
    CoralD: '#ee483a',

    TealL: '#A0C9D7',

    PinkL: '#E847C4',
    PinkM: '#ff4567',
    PinkD: '#db2b4b',

    OrangeL: '#fca640',
    OrangeM: '#ffa030',

    MintL: '#0fd1a8',
    MintM: '#03b690',
    MintD: '#049677',

    SkyL: '#5ca3ff',
    SkyM: '#47C7E8',
    SkyD: '#247beb',

    GreyBlue: '#2F8CB7',

    // Daily Mood
    BlueL: '#25B3DD',

    // Daily Reflection
    BlueD: '#2F6EB7',

    transparent: 'rgba(0,0,0,0)',
    navBorderColor: 'rgba(0,0,0,0.08)',
    BorderL: '#F1F8FF',
    HalfOpacity: 'rgba(255,255,255,0.5)',
    SmallOpacity: 'rgba(255,255,255,0.9)',
    darkOpacityM: 'rgba(0, 0, 0, 0.8)',
    darkOpacityS: 'rgba(83, 83, 83, 0.6)',
    darkOpacityL: 'rgba(0, 0, 0, 0.2)',
    blueM: '#1777FF',
    blueD: '#253447'
}

const ColorsService = {
    ...colors,
    getColor: color => {
        const col = colors[color]
        if (!col) {
            throw new Error(`Color ${color} not found in color variables`)
        }
        return col
    },
    random: () => {
        const list = []
        for (let i = 0; i < 3; i++) {
            list.push(Math.floor(Math.random() * 100) + 100)
        }
        return `rgb(${list.join(',')})`
    }
}

export default ColorsService
