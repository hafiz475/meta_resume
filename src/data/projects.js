// src/data/projects.js
export const projects = [
    {
        id: "carzmoto",
        title: "CarzMoto Billing & Service Platform",
        logo: "/assets/logos/carz moto.png", // if your file name is carzmoto.png update path accordingly
        lotties: ["/assets/lotties/firebase.json", "/assets/lotties/node.json", "/assets/lotties/express.json", "/assets/lotties/mongodb.json", "/assets/lotties/aws.json", "/assets/lotties/whatsapp.json"],
        summary: `A full billing + product management + WhatsApp PDF delivery system for an auto accessories garage in Chennai.`,
        position: [3.5, 1.2, -2.0],
        rotation: [0, 1.2, 0]
    },
    {
        id: "bizmagnets",
        title: "Bizmagnets WhatsApp CRM",
        logo: "/assets/logos/bizmagnets.png",
        lotties: ["/assets/lotties/whatsapp.json", "/assets/lotties/node.json", "/assets/lotties/mongodb.json"],
        summary: `WhatsApp Business CRM: chatbots, automation, ticketing.`,
        position: [-3.2, 1.7, 1.5],
        rotation: [0, 3.4, 0]
    },
    {
        id: "nippon",
        title: "Nippon Paint Digital Billing",
        logo: "/assets/logos/nippon.png",
        lotties: ["/assets/lotties/react.json", "/assets/lotties/node.json"],
        summary: `Tablet-based billing workflow migration for Nippon Paint.`,
        position: [1.0, 2.0, 3.3],
        rotation: [0, 4.9, 0]
    }
];
