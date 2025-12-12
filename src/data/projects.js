//src/data/projects.js

export const projects = [
    {
        id: "carzmoto",
        title: "CarzMoto Billing & Service Platform",
        logo: "/assets/logos/crazmoto.png",
        lotties: [
            "/assets/lotties/firebase.json",
            "/assets/lotties/node.json",
            "/assets/lotties/express.json",
            "/assets/lotties/mongodb.json",
            "/assets/lotties/aws.json",
            "/assets/lotties/whatsapp.json"
        ],
        summary: `
A full billing + product management + WhatsApp PDF delivery system
for an auto accessories garage in Chennai.
Features OTP login (Firebase), image uploads to S3, PDF generation,
MongoDB orders, light/dark UI themes, analytics dashboard.
Built fully solo. Hosted on DigitalOcean.
    `,
        position: [3.5, 1.2, -2.0],
        rotation: [0, 1.2, 0]
    },

    {
        id: "bizmagnets",
        title: "Bizmagnets WhatsApp CRM",
        logo: "/assets/logos/bizmagnets.png",
        lotties: [
            "/assets/lotties/whatsapp.json",
            "/assets/lotties/node.json",
            "/assets/lotties/mongodb.json"
        ],
        summary: `
A complete WhatsApp Business CRM: chatbots, flows,
ticketing, team inbox, routing. Full-stack React + Node developer.
    `,
        position: [-3.2, 1.7, 1.5],
        rotation: [0, 3.4, 0]
    },

    {
        id: "nippon",
        title: "Nippon Paint Digital Billing",
        logo: "/assets/logos/nippon.png",
        lotties: [
            "/assets/lotties/react.json",
            "/assets/lotties/node.json"
        ],
        summary: `
Moved Nippon’s paper-based painter billing to a digital tablet workflow.
React frontend, Node backend. 10-member team, 1.5 years.
    `,
        position: [1.0, 2.0, 3.3],
        rotation: [0, 4.9, 0]
    }
];
