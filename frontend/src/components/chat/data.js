// just a mock data for chat messages and users
export const users = [
    {
        name: "Steve E.",
        username: "@steveEberger",
        avatar: "https://robohash.org/2isjen,fjpg",
        online: true,
        isAdmin: true,
    },
    {
        name: "Katherine Moss",
        username: "@kathy",
        avatar: "https://robohash.org/3isjen,fjpg",
        online: false,
        isAdmin: true,
    },
    {
        name: "Phoenix Baker",
        username: "@phoenix",
        avatar: "https://robohash.org/1isjen,fjpg",
        online: true,
        isAdmin: false,
    },
    {
        name: "Eleanor Pena",
        username: "@eleanor",
        avatar: "https://robohash.org/4isjen,fjpg",
        online: false,
        isAdmin: false,
    },
    {
        name: "Kenny Peterson",
        username: "@kenny",
        avatar: "https://robohash.org/5isjen,fjpg",
        online: true,
        isAdmin: false,
    },
    {
        name: "Al Sanders",
        username: "@al",
        avatar: "https://robohash.org/6isjen,fjpg",
        online: true,
        isAdmin: false,
    },
    {
        name: "Melissa Van Der Berg",
        username: "@melissa",
        avatar: "https://robohash.org/7isjen,fjpg",
        online: false,
        isAdmin: false,
    },
];

export const chats = [
    {
        id: "1",
        sender: users[0],
        messages: [
            {
                id: "1",
                content: "Hi Olivia, I am currently working on the project.",
                timestamp: "9:00",
                sender: users[0],
            },
            {
                id: "2",
                content: "That sounds great, Mabel! Keep up the good work.",
                timestamp: "9:10",
                sender: "You",
            },
            {
                id: "3",
                timestamp: "11:30",
                sender: users[0],
                content: "I will send the draft by end of the day.",
            },
            {
                id: "4",
                timestamp: "2:00",
                sender: "You",
                content: "Sure, I will be waiting for it.",
            },
            {
                id: "5",
                timestamp: "4:30",
                sender: users[0],
                content: "Just a heads up, I am about to send the draft.",
            },
            {
                id: "6",
                content:
                    "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
                timestamp: "10:16",
                sender: users[0],
            },
            {
                id: "7",
                content:
                    "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
                timestamp: "11:40",
                sender: users[0],
            },
            {
                id: "3",
                timestamp: "11:40",
                sender: users[0],
                content: "Tech requirements.pdf",
                attachment: {
                    fileName: "Tech requirements.pdf",
                    type: "pdf",
                    size: "1.2 MB",
                },
            },
            {
                id: "8",
                timestamp: "11:41",
                sender: "You",
                content: "Awesome! Thanks. I'll look at this today.",
            },
            {
                id: "9",
                timestamp: "11:44",
                sender: users[0],
                content:
                    "No rush though — we still have to wait for Lana's designs.",
            },
            {
                id: "10",
                timestamp: "2:20",
                sender: users[0],
                content:
                    "Hey Olivia, can you please review the latest design when you can?",
            },
            {
                id: "11",
                timestamp: "2:21",
                sender: "You",
                content:
                    "Sure thing, I'll have a look today. They're looking great!",
            },
        ],
    },
    {
        id: "2",
        sender: users[1],
        messages: [
            {
                id: "1",
                content: "Hi Olivia, I am thinking about taking a vacation.",
                timestamp: "9:00",
                sender: users[1],
            },
            {
                id: "2",
                content:
                    "That sounds like a great idea, Katherine! Any idea where you want to go?",
                timestamp: "9:05",
                sender: "You",
            },
            {
                id: "3",
                content: "I am considering a trip to the beach.",
                timestamp: "9:30",
                sender: users[1],
            },
            {
                id: "4",
                content: "The beach sounds perfect this time of year!",
                timestamp: "9:35",
                sender: "You",
            },
            {
                id: "5",
                content: "Yes, I agree. It will be a much-needed break.",
                timestamp: "10:00",
                sender: users[1],
            },
            {
                id: "6",
                content: "Make sure to take lots of pictures!",
                timestamp: "10:05",
                sender: "You",
            },
        ],
    },
    {
        id: "3",
        sender: users[2],
        messages: [
            {
                id: "1",
                content: "Hey!",
                timestamp: "10:05",
                sender: users[2],
                unread: true,
            },
        ],
    },
    {
        id: "4",
        sender: users[3],
        messages: [
            {
                id: "1",
                content:
                    "Hey Olivia, I was thinking about doing some home improvement work.",
                timestamp: "9:00",
                sender: users[3],
            },
            {
                id: "2",
                content:
                    "That sounds interesting! What kind of improvements are you considering?",
                timestamp: "9:05",
                sender: "You",
            },
            {
                id: "3",
                content:
                    "I am planning to repaint the walls and replace the old furniture.",
                timestamp: "9:15",
                sender: users[3],
            },
            {
                id: "4",
                content:
                    "That will definitely give your house a fresh look. Do you need help with anything?",
                timestamp: "9:20",
                sender: "You",
            },
            {
                id: "5",
                content:
                    "I might need some help with picking the right paint colors. Can we discuss this over the weekend?",
                timestamp: "9:30",
                sender: users[3],
            },
        ],
    },

    {
        id: "5",
        sender: users[4],
        messages: [
            {
                id: "1",
                content: "Sup",
                timestamp: "10:05",
                sender: users[4],
                unread: true,
            },
        ],
    },
    {
        id: "6",
        sender: users[5],
        messages: [
            {
                id: "1",
                content: "Heyo",
                timestamp: "10:06",
                sender: "You",
                unread: true,
            },
        ],
    },

    {
        id: "7",
        sender: users[6],
        messages: [
            {
                id: "1",
                content:
                    "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
                timestamp: "10:07",
                sender: users[6],
                unread: true,
            },
        ],
    },
];
