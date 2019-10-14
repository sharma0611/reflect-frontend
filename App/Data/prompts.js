import React from 'react'
import ShuffleSeed from 'shuffle-seed'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIIcon from 'react-native-vector-icons/MaterialIcons'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/Feather'
import { Colors } from 'Themes'
import { DAILY_REFLECTION } from 'Controllers/MongoController'

const PRODUCTIVITY = 'Productivity'
const MINDFULNESS = 'Mindfulness'
const MENTAL = 'Mental'
const PHYSICAL = 'Physical'
const SOCIAL = 'Social'
const GRATITUDE = 'Gratitude'
const MOTIVATION = 'Motivation'
const STRESS = 'Stress'
const MANTRAS = 'Mantras'
const HOPE = 'Hope'

// daily goals
const FAMILY = 'Family'
const FRIENDS = 'Friends'

const PUBLIC_CATEGORIES = [PRODUCTIVITY, MINDFULNESS, MENTAL, PHYSICAL, SOCIAL]

const PAYWALL_CATEGORIES = [GRATITUDE, MOTIVATION, MANTRAS, STRESS, HOPE]

const GOAL_CATEGORIES = [FAMILY, FRIENDS, PRODUCTIVITY]

const GOALS_COPY = {
    [FAMILY]: [
        'Start a family book club.',
        'Call a relative',
        'Call a relative',
        'Call a relative',
        'Call a relative',
        'Call a relative',
        'Call a relative',
        'Have a device-free family dinner'
    ],
    [FRIENDS]: [
        'Smile at a friend today!',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Hold a candlelit dinnery party.',
        'Have a sleepover.'
    ],
    [PRODUCTIVITY]: [
        'Go to bed at 10PM.',
        'Clear my room.',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Make a handmade gift for a friend.',
        'Have a good attitude.',
        'Wake up at 6AM.'
    ]
}

const PROMPTS_COPY = {
    POSITIVE: [
        'Recount an event today that made me smile…',
        'What was my main goal today?',
        'What did I do today to make myself better?',
        'What am I looking forward to do tomorrow?',
        'What goal did I achieve today?',
        'What was a tough obstacle that I managed today?',
        'How did my friends make my day better?',
        'What happened today that I wish happened everyday?'
    ],
    NEGATIVE: [
        'What challenged me today?',
        'What could have I said no to today?',
        'What tempted me today? Did I resist?',
        'What could have I done better today?',
        'What will I do better tomorrow?',
        'What opportunity did I miss today?',
        'What do I regret about today?',
        'Write about an impulsive decision I made today… '
    ],
    GENERAL: [
        'How do I maintain balance in my life? ',
        'If I could relive an experience in my life, what would it be?',
        'Where is my favourite place in the world?',
        'How do I maintain my mental health?',
        'How do I maintain my physical health?',
        'If I could change something about myself, what would it be?',
        'How have I changed since 5 years ago?',
        'How do I handle a bad day?',
        'What was the best day of my life?',
        'What was the worst day of my life?',
        'What does growing older mean to me?',
        'What scares me?',
        'What are my top 5 goals?',
        'What makes me unique?',
        'What’s top 5 on my bucket list?',
        'Am I addicted to social media? Be honest. How does it impact my life? What changes can I make?',
        'Who or what inspires me?',
        'What is the best gift I have ever given or received?',
        'List the things I need/want to achieve this week…',
        'Write about a promise I made to someone. Did I keep that promise?',
        'What advice would I give myself 5 years ago?',
        'Write about a book/movie/song that has made a huge impact on myself.',
        'What is my favourite season and why?',
        'If I had all of the money in the world, would I still be doing what I do now?',
        'How does it feel to be the age I currently am?',
        'What are my top life hacks?',
        'Write about my best friend. Why are they my bestie?',
        'When I’m feeling down, what picks me up?',
        'What excites me about the future?',
        'What do I wish others knew about myself?',
        'What is my life motto, the words I live by?',
        'What difference do I want to make in the world and why?',
        'Do I have a hero? Describe what I admire about them…',
        'What is my greatest strength?',
        'How do I manage stress?',
        'Write about a time I failed. What did I learn?',
        'What is a trait that I admire most in others?',
        'Write about someone I miss…',
        'What is it I would like support in most?',
        'Write about my most embarrassing moment.',
        'Who has been a bad influence on you lately? What can you avoid?'
    ],
    [PRODUCTIVITY]: [
        'What was the biggest challenge I had today?',
        'What are my goals for today?',
        'What is my most unique personal strength?',
        'What is the biggest accomplishment in my personal life?',
        'What are my biggest distractions in life?',
        'How do I plan on reaching my goal(s)?',
        'What three things could I do without that would give me more energy, time, efficiency throughout the day?',
        'Do I feel stuck in my life?',
        'What does my ideal day look like?',
        'How have I grown this year?',
        'What ideas inspire me?',
        'What did I learn from yesterday?',
        'What are my priorities in life?',
        'Do I have a clear vision about my future?',
        'Do I use my time well?',
        'Am I using the right tools to be productive?',
        'What habits would I like to develop? How are they going to help my long-term goals?',
        "When did I learn a lesson the 'hard way'?",
        'What ignites my spirit for work and productivity?',
        'How could I become the best version of myself? What sacrifices would I have to make?',
        'What is my biggest cause of stress in life? How could I reduce it?',
        'Who do I admire or look up to?',
        'What is the biggest accomplishment in my professional life?',
        'How can I become a better communicator?',
        'What is one area I can learn about that would make me better at my job?',
        'Have I ever had missed out on a great opportunity?',
        'Do I actively step out of my comfort zone? How so?',
        'Imagine I have a million dollars in the bank right now. How did I make it?',
        'When did I last fail? What did it teach me?',
        'When do I get my best ideas?',
        'What is more important, quantity or quality?',
        'Do I like competition?',
        'How do I define success? What is a successful person like?',
        'Am I a good leader? How can I be better?',
        'How does it feel to try something new?',
        'Is discipline important to live a good life?',
        'What are my biggest achievements in life?',
        'Have I ever gotten in trouble at work/school? How did it make me feel?',
        'How would my life change without the internet?',
        'What beliefs/assumptions hold me back?',
        'As a kid, what did I dream of doing when I grew up?',
        'What are some engaging activities that cause me to completely lose track of time?',
        'What habits keep my life together?',
        'What time of day am I most productive?',
        'What have I always wanted to do, but haven’t gotten around to it?',
        'Do I believe in work/life balance?',
        'Do I have a meditation habit?',
        'What do I expect to happen in 1 year from now?',
        'What makes me wake up in the morning?',
        'What is one thing that I will always do?',
        'How do I prevent burnout?',
        'How much control do I have over my life?',
        'Should I fear failure?',
        'What was my first thought in the morning?',
        "Do I have any 'shower-thoughts'? ",
        'Am I organized?',
        'If I could change one law in my country, what would it be?',
        'What are my next steps?',
        'How did my expectations compare to my results?',
        'What is it I would like support in most?',
        'How does journaling help me?',
        'What drives my daily behavior?',
        'What mistakes am I grateful for?',
        'If I could become an expert in any activity, what would it be?',
        'What is stopping me?',
        'When was the last time I felt courageous? ',
        'How could I possibly make the world a better place right now?',
        'What opportunities have come my way recently that I am grateful for?',
        'How can I surpass my own expectations today?',
        'What is something that makes me uncomfortable in a good way?',
        'Do I work hard enough to achieve my goals?',
        'How do I feel about money? How important is it to my happiness?',
        'What is my biggest fear in relation to money?',
        'What would I do if I ran out of money tomorrow?',
        'What is my life purpose?',
        'What is that one thing I wish I was the best at?',
        'When was the last time my hard work paid off?',
        'When do I feel unsure?',
        'Is my life what I imagined?',
        'What is something that I do without ever failing at it?',
        'What are some things I am distracting myself with?',
        'Do I have good descriptive skills? Am I aware of the small details about things?',
        'Am I often messy?',
        'Do rules limit me?',
        'Do I like to do things just for the sake of it?',
        'What is something that overwhelms me?',
        'How and why did my priorities change overtime?',
        'Do I live to work or work to live?',
        'Is it worse to fail or never try at all?',
        'What do I think is more important: the journey or the result?',
        'Am I more afraid of success or failure? Why?',
        'Am I a dreamer or a go-getter?',
        'Am I a servant of money, or does money serve me?',
        'Would I ever choose the easy way in life?',
        'What is something that I could do all day?',
        'Do I think it is better to save money or invest?'
    ],
    [MINDFULNESS]: [
        'What was the best part of my day?',
        'What do I need to let go of?',
        'What was the biggest lesson I have learned as a teenager?',
        'What was the biggest obstacle I have ever overcome in my life?',
        'If I had 30 days left to live, what would I do?',
        'What would I do if I couldn’t fail, and there are no limitations in time, resources or money?',
        'What would I tell my five-year-old self?',
        'How can I improve the way I treat and talk to myself?',
        'When was the last time I cried, and what did it teach me?',
        'What makes me frustrated and annoyed at life the most?',
        'When did I last read a book? What did I learn from it?',
        'How do I define art? What is art in my eyes?',
        'What was the best thing that happened to me this week?',
        'What do I really want?',
        'What was the last criticism I received? How did it affect me, did I learn from it?',
        'If today was my last day on earth, what would I write?',
        'What is something I would miss, if I no longer had it?',
        'If I no longer had any fear, what would I do?',
        'What is my biggest weakness? How do I define weakness?',
        'What were the most important things my parents have taught me?',
        'What is something that you will never get back?',
        'What is beginning for me right now?',
        'What are my most important values and morals? Why?',
        'Do I believe in unconditional love?',
        'What do I need to let go of?',
        'When did I last feel loved and valued?',
        'What speaks to me on a deep emotional, spiritual level? ',
        'What surprised me the most in my life?',
        'Are there any secrets I would never ever tell someone?',
        'Have I ever had a lucid dream?',
        'What is my last memory from my childhood?',
        'What things am I addicted to? - How do they affect my life?',
        'Am I hard or easy on myself?',
        'Do I have a philosophy of life? What words do I live by?',
        'What is a mistake people often make about me?',
        'Do I enjoy being alone?',
        'What are my favourite memories from childhood?',
        'How much do I think I know about yourself?',
        'Would I live in the medieval times?',
        'What is the best compliment I have ever received?',
        'What is the hardest thing to do in life?',
        'Do I believe in God?',
        'What existed before the universe was created?',
        'What is the craziest experience you have ever witnessed?',
        'What is your favourite quote?',
        'What is someone/something that you envy?',
        'What do I need today?',
        'Can I spot a liar? ',
        'Do I often lie to myself?',
        'What am I grateful for in this moment?',
        'What is an affirmation that can help me today?',
        'What is the simplest thing I like about life?',
        'How would I like to live my life when I get old?',
        'What traditions do I have? What makes them unique?',
        'What are the biggest problems people face nowadays?',
        'How would I live my life if there was no electricity and internet?',
        'What can parents learn from younger generations?',
        "Do I agree with the following statement: 'How I do anything, is how I do everything.'?",
        'What is one thing I cannot live without?',
        'What do I do on rainy days; how do rainy days make me feel?',
        'What effect does music have on me?',
        "What's wrong to do but people do anyways? What motivates people?",
        'Do I think life is short?',
        'What would I like to forget?',
        "'Money cannot buy happiness.' Do I agree or disagree with that statement?",
        'Do I have a life motto? What is it?',
        'What makes me feel cozy?',
        'Is hope important?',
        'What characteristics do I judge the most harshly in myself?',
        'What is my sense of humor like?',
        'What are some comfortable aspects of my life that I sometimes take for granted?',
        'What emotions have been dominating my life lately?',
        'What is my favorite way to start the day?',
        'In what areas of my life do I need healing?',
        'What is the strangest dream I have ever had?',
        'What is the one thing you want to do differently tomorrow?',
        'What makes me, me?',
        'Would I want to know when I’m going to die?',
        'What is my worst quality? How could you improve on that, or do you even want to?',
        'What would my older self say to me today?',
        'What makes me feel the most excited?',
        'Do I practice self-love?',
        "In which ways would the world be different if I hadn't been born?",
        'What does getting old mean to me?',
        'How does religion affect my life?',
        'How does science affect my life?',
        'If I could become invisible, what would I do?',
        'Is it better to give or to receive?',
        'If I could redo life, would I? Why?',
        'What would I say to my child self?',
        'Am I replaceable?',
        'How would I describe yourself in one word?',
        'What century do I think I would most belong in?',
        'Would I sacrifice myself for a stranger?',
        'What do I want my final words to be?',
        'What is something that I will most likely never experience?',
        'Is intelligence or wisdom more useful? Why?',
        'What do we most need in this world?',
        'What is the difference between living and existing?',
        'Is there a reason to feel happy?',
        'Do I believe in fate?',
        'How do I think our civilization will go extinct?',
        'How old or young do I feel like?'
    ],

    [MENTAL]: [
        'What was the most painful thing I have ever experienced?',
        'What is my biggest fear?',
        'What is my favourite season and why?',
        'What is one long-term goal I wish to work towards?',
        'What annoys me the most in my life?',
        'What limiting beliefs am I holding onto?',
        'When did I feel the proudest in my life and why?',
        'What worries me?',
        'What brings me joy?',
        'When do I feel the most energized?',
        'When was a time I could not stop laughing?',
        'Am I a confident person? What make me feel confident?',
        'What do I see when I look in the mirror?',
        'What is my best intellectual quality?',
        'What is the bravest thing I have ever done in your life?',
        'How much can I trust myself?',
        'What is a common experience for people that I have never experienced?',
        'How impulsive am I?',
        'Is technology a friend, or a foe?',
        'What would I change about this world?',
        'What activities make me calm?',
        'What makes me unique?',
        'Is there always a solution for every problem in the world? What problems are unsolvable? ',
        'What do I want to learn more about?',
        'Do I believe in soulmates?',
        'What can I do for when I’m having a bad day?',
        'What are some things I’m capable of? What are some things out of my reach? ',
        'How do I want to feel?',
        'What is something I have not forgiven myself for?',
        'Is there something that I believe is truly worth fighting for?',
        'What is something that always cheers me up, even on my toughest days?',
        'When do you feel the most alive?',
        'What do I want to get rid of from my life?',
        'What are my thoughts on death?',
        'If I could have a superpower, what would it be? Why?',
        "What excuses am I making on a daily basis? How would my life change if I didn't have them?",
        'What do I want to be remembered for after I pass away?',
        'What makes me miserable?',
        'What is a promise I must keep to myself?',
        'How do I recharge my motivation?',
        'What is the biggest enemy of my happiness?',
        'What is something that really bugs me?',
        'How much do I live in the moment?',
        'Do I often worry about the future?',
        'Do I often feel anxious about the past?',
        'What things am I deeply affected by?',
        'What is more important; meaning or happiness?',
        'What do I spend my time thinking about?',
        'What makes me feel fulfilled?',
        'What makes me feel inadequate?',
        'Is my ethnicity an important part of my identity?',
        'Do I ever feel lost?',
        'How does it feel to be the age I currently am?',
        'What makes me cry?',
        'What are the most used applications on my phone?',
        'What is something I need to forgive myself for?',
        'What things in my life do I truly enjoy vs. tolerate?',
        'Do I consider myself to be spontaneous or more of a planner?',
        'How do I undervalue myself?',
        'What is the worst piece of advice to give someone?',
        'How do I feel about politics in general?',
        'How would I think my parents views would change if they lived my life for one day?',
        'Is war ever justified?',
        'What is the fastest way to make me laugh?',
        'What are the quirkiest things about me?',
        "Do I have an 'evening ritual'?",
        'What is something that I think matters, but actually does not?',
        'Am I patient?',
        'How do I focus?',
        'What should someone do if they feel their friend is planning on harming him/herself?',
        'How important is responsibility?',
        "How safe have the safe choices I've made actually proven to be?",
        'If I had a choice, what would I dream about tonight?',
        'What is one experience in my life that I have had and cannot be explained rationally?',
        'What is my saddest memory?',
        'What does high self-esteem look like to me?',
        'What do I love about myself?',
        'What is the scariest thing I have ever experienced?',
        'What makes something/someone scary?',
        'What was I like as a child? How am I different now?',
        'What do I consider to be my biggest flaw?',
        'What do I think is the greatest invention?',
        'Have I ever had an encounter with the police? What was it like?',
        'Do I like to break rules? Why?',
        'Do I believe in any conspiracy theories? Why?',
        'What does it mean to be a hero?',
        'What makes me feel empowered?',
        'What is my favourite word?',
        'What is the most powerful word?',
        'What was the greatest day of my life?',
        'Which is more important: what I say or how I say it?',
        'How do I think the world will change in 100 years?',
        'What values do I think are critical to communicate to younger people?',
        'What are some things that should be taught in school but are not?',
        'What is the most unsettling fact I can think of?',
        'Can society exist without laws?',
        'Is privacy a right?',
        'Is it immoral to do something wrongif nobody ever finds out?',
        'Do dreams have meanings?',
        'Which is more real, mind or matter?',
        'Do I think immortality is possible?',
        'What do I think of death?',
        'Where do I think we come from?',
        'What separates humans from animals?',
        'Are positive or negative emotions more powerful?',
        'Am I afraid of death?',
        'If there was a universal way of greeting, what should it be?',
        'Do I believe that the day will come when computers will be more intelligent than humans?',
        'Do I wish to be famous?',
        'What does a peaceful life look like to me?',
        'Do I engage in negative self-talk?',
        'What do I usually dream about?',
        'Do I have any phobias? What are they and why do I think they exist?',
        'What is the worst nightmare I have ever had?',
        'Am I confrontational? Is it important to be confrontational?'
    ],
    [PHYSICAL]: [
        'What are the last 5 things I bought? What value did they add to my life?',
        'What does my ideal home look like?',
        'What physical characteristics are you most grateful for?',
        'What makes me feel safe?',
        'What is my favourite sport that gets me moving?',
        'What emotions do I feel when I exercise?',
        'Do I think the people around me exercise enough?',
        'What do I think is more important: a good diet or exercise?',
        'How do I feel when I go a long time without any physical exercise?',
        'What does it mean to have an active lifestyle?',
        'What is my favourite way to exercise?',
        'What physical traits cause me to be self-conscious?',
        'Do I feel comfortable in my physical being right now? If not, what could I do about it?',
        'What food have I never eaten, but I would really like to try?',
        'What is the spiciest thing I have ever eaten?',
        'What is the most expensive thing I have ever bought? Was it worth the price?',
        'What odd smells do I really enjoy?',
        'What was my most physically painful experience?',
        'How could I eat more healthy?',
        'Could I ever become vegan?',
        'How often do I eat during the day?',
        'What is my opinion on the food pyramid?',
        'Do I have any dietary rules?',
        'What does self-care look like for me?',
        'If I could have plastic surgery for free, would I take the offer?',
        'What do I like about my physical appearance?',
        'Am I judgemental about other people?',
        'What do I often get compliments about?',
        'What would my body tell me, if it could talk?',
        'What element of nature did I enjoy today?',
        'What inventions am I grateful for?',
        'What is my favourite sport? Why do I like that particular sport?',
        'What color makes me think of happiness?',
        'What was my childhood room like?',
        'If I could go to anywhere in the world, where would I go and why?',
        'How do I feel about my body right now? Is my body tense, or am I relaxed?',
        'Do I believe in moderation?',
        'What is my favourite guilty pleasure?',
        "Do I trust my 'gut-feelings'?",
        'How much did I eat today?',
        'How do I refresh?',
        'What is my favourite place to eat?',
        'How does it feel to win at something I practiced?',
        'What is one food that I would never try?',
        'Have I ever had a workout/exercise buddy? How did they help you grow?',
        'Have I ever been in a life or death situation?',
        'What important qualities does exercising improve?',
        'Why do I crave the foods I crave?',
        'Am I afraid of the dark?',
        'Is there something I constantly lose at my house, or anywhere else?',
        'What is the longest time I have gone without sleep? How did it make me feel like?',
        'Am I afraid of heights?',
        'When I feel anxious, how does my body feel like?',
        'Would I live on Mars, or any other planets if they were habitable?',
        'What was my most embarrassing moment in life? What have I learnt from it?',
        'Is my room clean? How do I feel when it is not?',
        'Do I like to take pictures of myself? How does it make me feel like?',
        'What is my fashion style? Do I believe in fashion?',
        'How do I feel when I challenge my body?',
        'What is my favourite animal? Why?',
        'Am I a night owl, or a morning person?',
        'What is the simplest form of pleasure that I enjoy?',
        'What is my favourite hour of the day?',
        'What do I love about the current season?',
        'What can I hear right now?',
        'What smells do I like?',
        'What do I keep in my handbag/wallet?',
        'What have I ever stolen?',
        'What is in my fridge?',
        'Do I like to cook?',
        'Do I collect anything?',
        "What's the most comfortable thing about my life?",
        'When was the last time I really pushed myself to my physical limits?',
        'Is a life that focuses on avoiding pain and seeking pleasure a good and worthwhile life?',
        'What do I like/dislike about the city I live in?',
        'What is my biggest comfort food?',
        'If you were in a band, what instrument would I play?',
        'As a force, are we humans creative or destructive?',
        'Do I prefer looks or brains?',
        'What does beauty mean to me?'
    ],

    [SOCIAL]: [
        'What do other people like about me?',
        'What do other people dislike about me?',
        'What do I like about my job?',
        'What activity do I enjoy doing with others?',
        "Do I donate to charity, or help others (ex. homeless people)? If I do, why, or if I don't, why not?",
        'How could I make someone I care about feel better if he/she just lost something important to them?',
        'How can I show more gratitude towards others?',
        'What is my environment like? Do I like the people I hang out with?',
        'In what ways do I impact other people throughout the day? Is it a negative or positive impact?',
        'What makes my friends special?',
        'What type of person do I want to be known as?',
        'When did I last mistreat someone? What happened?',
        'Do I express myself and my emotions well to others?',
        'How do I feel when I am in a large group of people?',
        'Do I ask for help from someone when experiencing problems in my life, or do I like to solve my problems by myself?',
        'Do I easily forgive others?',
        'Do I gossip about others?',
        'What mistakes do i think my parents are making? Why are these actions wrong?',
        'Would I risk my life to save my friend?',
        'What do other people think about me?',
        'How much can I trust others?',
        'What am I interested in that most people are not?',
        'Do I believe my words have power?',
        'What was the kindest thing I have ever done to someone?',
        'What does nobody know about me?',
        'What is the most evil thing that I could do to others? What stops me from doing it? ',
        'Do I make a positive difference in the world?',
        "What would I do if the opinions of other people wouldn't hold me back?",
        'Am I surrounding myself with people who bring the best out of me?',
        'How would you like people to describe me?',
        'If I could talk to anyone, dead or alive, who would that person be?',
        'What makes me a good friend?',
        'Who is my biggest idol? Why?',
        "What is my 'perfect' - or as close as you can get to that - relationship or friendship like?",
        'Has a friend ever betrayed me? How did I react?',
        "Do I secretly crave other people's attention?",
        'Who will mourn for me when you die?',
        'What do I think are the most attractive personality traits in others?',
        'What do I think is the most important question in the world that needs to be asked?',
        "Do I think it's important to have good manners?",
        'How do I encourage others?',
        'What do I do when someone is in emotional pain? Do I try to offer a solution to their problem; or do I try to cheer them up instead?',
        'What is my most meaningful friendship/relationship like?',
        'Do I ever feel isolated?',
        'What is one thing I think all people should know?',
        'What do I think is something that everyone needs in a friendship?',
        'Did I make any new friends this year? How do I feel about them?',
        'Who made the biggest impact on me this year?',
        'What was the best advice I have ever given someone? How did it impact that person?',
        'How do I define family?',
        'Would I rather be loved, or respected?',
        'Why do I think people become bullies?',
        'What kind of websites do I often visit? Why?',
        'What was the nicest thing someone said about me?',
        'How do I start a conversation? How do I continue one?',
        'What do I think about celebrities?',
        "Do other people's negative emotions affect me?",
        'Do I often compare yourself to others? What comparisons do I make?',
        'Have I ever stuck up for someone? What was the situation?',
        'Have I ever met a famous person? Describe the experience.',
        'Would I rather have a brother or a sister?',
        'How do I know if others truly love me?',
        'Who is my favourite person to be with?',
        'What frustrates me most about my friendships or relationships?',
        'What is my personal style like?',
        'What would I like someone to say to me right now?',
        'What type of people make me feel inferior?',
        'Do I ever feel superior to others? Why?',
        'When I give to others, do I always expect something in return?',
        'Who is someone in my life I would like to spend more time with?',
        'Do I prefer being outdoors or indoors? What is my favourite thing to do indoors/outdoors?',
        'How do I feel about commitment? Why?',
        'What has someone told me about myself that you will never forget?',
        'What made my best teacher so good?',
        'What do I like or dislike about elderly people?',
        'Do I enjoy solitude? Why?',
        'How do I show others that I care?',
        'How do I encourage others?',
        'What is something I really like talking about?',
        'Do I enjoy small talks? What about them do or don’t I enjoy?',
        'What are some of my favorite memories with your family?',
        'When was a time I was happy for a friend?',
        'When was the last time I received a recognition or praise? What was it?',
        'What do I think is not properly managed in society?',
        'Who do I spend the most time talking to?',
        'When was the last time I met someone who became my friend? How did our friendship grow?',
        'Who from my past do I wish were still around? What are my favourite memories of them?',
        "If I had the power to change one person's life, how would I do it?",
        'Have I ever had a crush on someone? What made me attracted to them?',
        'Which person am I the most thankful for? Why do they deserve my appreciation?',
        'In what life situations do I feel the most awkward?',
        'What nicknames do people give me? Which ones are my favourite? ',
        'Who do I trust? Why do I trust them?',
        'Have I ever lost someone close to me? What was my best memory of them?',
        'Do I trust anyone with my life? Why do I trust that person?',
        'Do I consider myself to be an extrovert or and introvert? Why? What do I think made me become an extrovert or an introvert?',
        'How would my perfect partner treat me?',
        'What do I think is the most insensitive thing a person could do?',
        "Have I ever broken someone's heart? What happened in that situation?",
        'What do I think we, as humans, are a part of? ',
        'How I you feel about infidelity? Why?',
        'Do I think people fueled by greed or by love? Why might I think that?',
        'Do I like my given name? Why, or why not?',
        'Which of my habits do other people consider weird?',
        'What is my biggest turn-off in a guy or a girl? Why?',
        'Am I willing to share my phone password with your romantic partner, why or why not?',
        'Do I believe that people of the opposite sex can be the best of friends?',
        'Am I missing someone right now? How would I describe that person?',
        'Am I scared to love? Why might that be?',
        'Do I prefer to hang out with extroverts, or introverts? Why?',
        'What do I hate or love about my culture?',
        'Is there somebody in my life who I don’t respect? Why?',
        'Do I prefer dating just 1 person and see where it goes or dating multiple people until I make a decision? Why do I think that is?'
    ],
    [GRATITUDE]: [],
    [MOTIVATION]: [],
    [MANTRAS]: [],
    [STRESS]: [],
    [HOPE]: []
}

const CATEGORY_COLORS = {
    [PRODUCTIVITY]: 'CoralM',
    [MINDFULNESS]: 'PinkL',
    [MENTAL]: 'PurpleM',
    [PHYSICAL]: 'SkyL',
    [SOCIAL]: 'GoldD',
    [GRATITUDE]: 'OrangeM',
    [MOTIVATION]: 'MintL',
    [MANTRAS]: 'GreenD',
    [STRESS]: 'TealM',
    [HOPE]: 'OceanM',
    [DAILY_REFLECTION]: 'NavyM',
    // daily goals
    [FAMILY]: 'GreenM',
    [FRIENDS]: 'GreyBlue'
}

const CATEGORY_SUBTITLES = {
    [FAMILY]: 'Value those who matter the most.',
    [FRIENDS]: 'Build a stronger connection.',
    [PRODUCTIVITY]: 'Grow into the right habits.'
}

const CATEGORY_ICONS = {
    [PRODUCTIVITY]: () => <EntypoIcon name="rocket" size={30} color={Colors.WhiteM} />,
    [MINDFULNESS]: () => <MCIcon name="lightbulb-on" size={30} color={Colors.WhiteM} />,
    [MENTAL]: () => <EntypoIcon name="cloud" size={30} color={Colors.WhiteM} />,
    [PHYSICAL]: () => <MCIcon name="weight" size={30} color={Colors.WhiteM} />,
    [SOCIAL]: () => <FaIcon name="user-friends" size={27} color={Colors.WhiteM} />,
    [GRATITUDE]: () => <MIIcon name="wb-sunny" size={30} color={Colors.WhiteM} />,
    [MOTIVATION]: () => <FIcon name="target" size={30} color={Colors.WhiteM} />,
    [MANTRAS]: () => <MCIcon name="hinduism" size={30} color={Colors.WhiteM} />,
    [STRESS]: () => <FaIcon name="yin-yang" size={30} color={Colors.WhiteM} />,
    [HOPE]: () => <MCIcon name="flower" size={35} color={Colors.WhiteM} />
}

class Prompts {
    getWeekdayNumber() {
        return this.date.getDay()
    }

    getDayNumber() {
        return this.date.getDate()
    }

    getMonthNumber() {
        return this.date.getMonth()
    }

    getPositivePrompt() {
        const d = this.getWeekdayNumber()
        const prompt = PROMPTS_COPY['POSITIVE'][d % 7]
        return prompt
    }

    getNegativePrompt() {
        const d = this.getWeekdayNumber()
        const w = Math.floor(this.getDayNumber() / 4)
        const prompt = PROMPTS_COPY['NEGATIVE'][(d + w) % 7]
        return prompt
    }

    getGeneralPrompt() {
        const d = this.getWeekdayNumber()
        const w = this.getDayNumber()
        const m = this.getMonthNumber()
        const general = PROMPTS_COPY['GENERAL']
        const prompt = general[(d * w * m) % general.length]
        return prompt
    }

    static getPublicCategories() {
        return PUBLIC_CATEGORIES
    }

    static getPaywallCategories() {
        return PAYWALL_CATEGORIES
    }
    static getGoalCategories() {
        return GOAL_CATEGORIES
    }

    static getAllCategories() {
        let publicCategories = this.getPublicCategories()
        // let paywallCategories = this.getPaywallCategories()
        publicCategories = publicCategories.map(title => {
            const color = CATEGORY_COLORS[title]
            const renderIcon = CATEGORY_ICONS[title]
            return { title, color, renderIcon, paywall: false }
        })
        // paywallCategories = paywallCategories.map(title => {
        //     const color = CATEGORY_COLORS[title]
        //     const renderIcon = CATEGORY_ICONS[title]
        //     return { title, color, renderIcon, paywall: true }
        // })
        // const allCategories = publicCategories.concat(paywallCategories)
        // return allCategories
        return publicCategories
    }

    static getAllGoalCategories() {
        let publicCategories = this.getGoalCategories()
        publicCategories = publicCategories.map(title => {
            const color = CATEGORY_COLORS[title]
            const subtitle = CATEGORY_SUBTITLES[title]
            return { title, color, subtitle, paywall: false }
        })
        return publicCategories
    }

    static getPromptsForCategory(category) {
        return PROMPTS_COPY[category]
    }

    static getGoalsForCategory(category) {
        return GOALS_COPY[category]
    }

    static getCategoryColor(category) {
        return CATEGORY_COLORS[category]
    }

    constructor(date) {
        // const d = this.getWeekdayNumber()
        // const w = this.getDayNumber()
        // const m = this.getMonthNumber()
        this.positive = PROMPTS_COPY.POSITIVE
        this.negative = PROMPTS_COPY.NEGATIVE
        this.general = PROMPTS_COPY.GENERAL
        this.date = date ? date : new Date()
        // this.general = ShuffleSeed.shuffle(PROMPTS_COPY['GENERAL'], d * w * m)
    }
}

export default Prompts
