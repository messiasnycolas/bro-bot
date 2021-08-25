// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, MessageFactory } from 'botbuilder';

export class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {

            if (context.activity.text.toLowerCase() === "help") {
                const replyText = `I'm Bro Bot. My purpose is to suggest you some movies. Try something like 'best action' or 'browse categories'.`
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                await next();
            } else {
                const replyText = `Echo: ${ context.activity.text }`;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            }
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 
            `Oh, hello ${context.activity.from.name}! I'm Bro Bot. I will suggest you movies, try something like 'best dramas' or 'browse categories'.`;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
