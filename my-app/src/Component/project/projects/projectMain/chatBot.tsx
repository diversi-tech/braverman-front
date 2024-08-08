import React, { useState, CSSProperties } from "react";
import ChatBot, { Flow, Options } from "react-chatbotify";
import { render } from "react-dom";
import axios from "axios";
import ReactWhatsapp from "react-whatsapp";
import { Project } from "../../../../model/project.model";
import { GetAllProjectPerUser } from "../../../../api/user.api";
import { sendEmail } from "../../../../api/sendEmail.api";

const MyChatBot2: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [form, setForm] = useState<{ project?: Project }>({});
  const [open, setOpen] = useState(false);

  const formStyle: CSSProperties = {
    marginTop: 100,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const ques = async (params: any) => {
    const userInput = params.userInput;
    switch (userInput) {
      case "בדיקת סטטוס פרויקט":
        const projects = await GetAllProjectPerUser(sessionStorage.getItem("userId")!);
        setProjects(projects);
        return projects.length > 1 ? "check_project" : "status";
      case "תמיכה טכנית":
        return "technical_support";
      case "הנהלת חשבונות":
        return "Bookkeeping";
      case "תכנים":
        return "contents"
      case "פתרון תקלות":
        return "resolve";
      default:
        return "end";
    }
  };

 

  const getProjectsById = async (params: any) => {
    debugger
    const project = projects.find((p) => p.businessName === params.userInput);
    setForm({ ...form, project });
    return project?.status.value;
  };

  const checkStatus = async () => {
    const projects = await GetAllProjectPerUser(sessionStorage.getItem("userId")!);
    return projects[0].stageStatus.value;
  };

  const checkBalance = async () => {
    const projects = await GetAllProjectPerUser(sessionStorage.getItem("userId")!);
    return projects[0].balance;
  };

  const technical_support = async (params: any) => {
    if (params.userInput === "יש בעיה עם הטעינה של האתר שלי") {
      return "yourApplication";
    }
  };

  const bookkeeping = async (params: any) => {
    const userInput = params.userInput;
    if (userInput === "אני צריך את פרטי החשבוניות שלי") {
      return "Invoicing";
    }
    if (userInput === "אני רוצה לדעת מה היתרה שלי לתשלום") {
      const projects = await GetAllProjectPerUser(sessionStorage.getItem("userId")!);
      setProjects(projects);
      return projects.length > 1 ? "choose_project" : "balance";
    }
  };

  const sendInvoice = async (params: any) => {
    
  };

  const moreHelp = async (params: any) => {
    return params.userInput === "כן" ? "start" : "end";
  };

  const contents = async (params: any) => {
    const userInput = params.userInput;
    if(userInput === "אני מחפש עזרה בעדכון תכנים")
       return "update"
    else if (userInput === "כתיבת פוסטים חדשים")
      return "update"
    return "contect"
  };
  const contect = async (params: any) => {
    return params.userInput === "וואצפ" ? "whatsapp" : "email";    
  }
  const whatsapp = async () => {
    debugger
    return(
    <ReactWhatsapp element="button" number="058-571-7274" message="Hello World!!!">
    Send WhatsApp Message
  </ReactWhatsapp>
    )
  }

  const sendEmail2 = async (emailContent: string) => {
    try {
      const body = ` ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")},\n\ שלח דיווח בצאט בוט:\n${emailContent}`;
      const response = await sendEmail( "צאט בוט ", body)
      return response.status === 200 ? 'המייל נשלח בהצלחה' : 'הייתה בעיה בשליחת המייל';
    } catch (error) {
      console.error('Error sending email:', error);
      return 'הייתה בעיה בשליחת המייל';
    }
  };

  const flow: Flow = {
    start: {
      message: `שלום ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}, איך אפשר לעזור לך היום?`,
      checkboxes: { items: ["בדיקת סטטוס פרויקט", "תכנים", "הנהלת חשבונות", "תמיכה טכנית", "פתרון תקלות"], max: 1 },
      path: (params) => ques(params),
    },
    check_project: {
      message: () => `אנא בחר פרויקט להצגת סטטוס`,
      checkboxes: { items: projects.map((p) => p.businessName) },
      function: (params) => getProjectsById(params),
      path: "get_status",
    },
    get_status: {
      message: () => `סטטוס הפרויקט הוא ${form.project?.stageStatus.value}                     ?האם יש עוד משהו שאוכל לעזור בו`,
      options: ["כן", "לא"],
      path: (params) => moreHelp(params),
    },
    ask_question: {
      message: "?איך אפשר לעזור לך היום",
      checkboxes: { items: ["בדיקת סטטוס פרויקט", "שעות פתיחה", "טלפון ליצירת קשר", "אחר"], max: 1 },
      path: (params) => ques(params),
    },
    status: {
      message: () => checkStatus(),
      path: "end",
    },
    // gpt_question: {
    //   message: "How can I help you today?",
    //   function: async (params) => getGPTResponse(params.userInput),
    //   path: "end",
    // },
    technical_support: {
      message: "מעולה, איזה סוג של בעיה טכנית יש לך? האם זה קשור לאתר עצמו, לשרת או למשהו אחר?",
      options: ["יש בעיה עם הטעינה של האתר שלי"],
      path: (params) => technical_support(params),
    },
    yourApplication: {
      message: "מצטער לשמוע על כך, בוא ננסה לבדוק את זה ביחד. האם הבעיה מופיעה בכל הדפדפנים או רק בדפדפן מסוים?",
      path: "end",
    },
    Bookkeeping: {
      message: "אין בעיה. איך אוכל לעזור לך בתחום הנהלת החשבונות? האם אתה צריך לדעת את היתרה שלך, את פרטי החשבוניות האחרונות, או משהו אחר?",
      options: ["אני רוצה לדעת מה היתרה שלי לתשלום", "אני צריך את פרטי החשבוניות שלי"],
      path: (params) => bookkeeping(params),
    },
    Invoicing: {
      message: "בטח, אנא הכנס את מספר החשבונית ואנחנו נשלח לך אותה למייל.",
      function: (params) => sendInvoice(params),
      path: "sending_invoice",
    },
    sending_invoice: {
      message: "אין בעיה, אני שולח לך את החשבונית מיד... החשבונית נשלחה למייל שלך. אם יש עוד משהו שאוכל לעזור בו?, אני כאן!",
      options: ["כן", "לא"],
      path: (params) => moreHelp(params),
    },
    balance: {
      message: () => checkBalance(),
      path: "end",
    },
    choose_project: {
      message: () => `אנא בחר פרויקט להצגת יתרה`,
      checkboxes: { items: projects.map((p) => p.businessName) },
      function: (params) => getProjectsById(params),
      path: "balance",
    },
    contents: {
     message:"?מעולה! איך אוכל לעזור לך עם התכנים באתר שלך ",
      options: [ "אני מחפש עזרה בעדכון תכנים","כתיבת פוסטים חדשים","משהו אחר"],
      path: (params) => contents(params),
    },
    update: {
      message: "אין בעיה, אתה יכול לשלוח לי את התוכן החדש לכתובת המייל office@braverman.digital                       האם אפשר לעזור במשהו נוסף?",
      options: ["כן", "לא"],
      path: (params) => moreHelp(params),
    }, 
    resolve: {
     message:"?הבנתי. איזה סוג של תקלה יש לך", 
     options:[],
     path:"end",
    },
    contect: {
      message: "התחלת שיחה ",
      options: ["וואצפ", "מייל"],
      path: (params) => contect(params),
    },
    email: {
      message: "אנא הכנס את תוכן המייל שברצונך לשלוח:",
      // input: true,
      path: async (params) => {
        const userMessage = params.userInput;
        const emailResponse = await sendEmail2(userMessage);
        return emailResponse === 'המייל נשלח בהצלחה' ? 'email_sent' : 'email_failed';
      },
    },
    email_sent: {
      message: "המייל נשלח בהצלחה. האם יש משהו נוסף שאוכל לעזור בו?",
      options: ["כן", "לא"],
      path: (params) => moreHelp(params),
    },
    email_failed: {
      message: "הייתה בעיה בשליחת המייל. האם תרצה לנסות שוב?",
      options: ["כן", "לא"],
      path: (params) => moreHelp(params),
    },

    end: {
      message: `תודה שפנית אלינו, ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")} אם יש לך שאלות נוספות או בעיות נוספות, תמיד תוכל לחזור אלי. שיהיה לך יום נפלא! 😊`,
      options: ["שיחה חדשה"],
      path: "start",
    },
    phone: {
      message: "אנא התקשר לטלפון 03-1234567 לכל שאלה נוספת",
      path: "end",
    },
    whatsapp:{
      // message: "אנא התקשר לטלפון 03-1234567 לכל  ",
      function:()=>whatsapp(),
    }
  };

  const options: Options = {
    theme: { embedded: true },
    chatHistory: { storageKey: "chatbot_history" },
  };

  return (
    <div>
      <ChatBot options={options} flow={flow} />
    </div>
  );
};

export default MyChatBot2;
