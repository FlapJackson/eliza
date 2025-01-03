"use strict";(self.webpackChunkeliza_docs=self.webpackChunkeliza_docs||[]).push([[70578],{54241:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"core/evaluators","title":"\ud83d\udcca Evaluators","description":"Evaluators are core components that assess and extract information from conversations. They integrate with the AgentRuntime\'s evaluation system.","source":"@site/docs/core/evaluators.md","sourceDirName":"core","slug":"/core/evaluators","permalink":"/eliza/docs/core/evaluators","draft":false,"unlisted":false,"editUrl":"https://github.com/elizaos/eliza/tree/main/docs/docs/core/evaluators.md","tags":[],"version":"current","lastUpdatedBy":"Shaw","lastUpdatedAt":1734846219000,"sidebarPosition":5,"frontMatter":{"sidebar_position":5},"sidebar":"tutorialSidebar","previous":{"title":"Actions","permalink":"/eliza/docs/core/actions"},"next":{"title":"Configuration","permalink":"/eliza/docs/guides/configuration"}}');var r=a(74848),s=a(28453);const i={sidebar_position:5},l="\ud83d\udcca Evaluators",o={},c=[{value:"Overview",id:"overview",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Built-in Evaluators",id:"built-in-evaluators",level:2},{value:"Fact Evaluator",id:"fact-evaluator",level:3},{value:"Goal Evaluator",id:"goal-evaluator",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Fact Extraction",id:"fact-extraction",level:3},{value:"Goal Tracking",id:"goal-tracking",level:3},{value:"Validation",id:"validation",level:3},{value:"Handler Implementation",id:"handler-implementation",level:3},{value:"Examples",id:"examples",level:3},{value:"Creating Custom Evaluators",id:"creating-custom-evaluators",level:2},{value:"Memory Integration",id:"memory-integration",level:3},{value:"Memory Usage",id:"memory-usage",level:3},{value:"Integration with Agent Runtime",id:"integration-with-agent-runtime",level:2},{value:"Error Handling",id:"error-handling",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"-evaluators",children:"\ud83d\udcca Evaluators"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/api/interfaces/evaluator",children:"Evaluators"})," are core components that assess and extract information from conversations. They integrate with the ",(0,r.jsx)(n.a,{href:"/api/classes/AgentRuntime",children:"AgentRuntime"}),"'s evaluation system."]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsx)(n.p,{children:"Evaluators enable agents to:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Build long-term memory"}),"\n",(0,r.jsx)(n.li,{children:"Track goal progress"}),"\n",(0,r.jsx)(n.li,{children:"Extract facts and insights"}),"\n",(0,r.jsx)(n.li,{children:"Maintain contextual awareness"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Import the necessary evaluator types:"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'import { Evaluator, IAgentRuntime, Memory, State } from "@elizaos/core-core";\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"Choose or create an evaluator:"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'const evaluator: Evaluator = {\n    name: "BASIC_EVALUATOR",\n    similes: ["SIMPLE_EVALUATOR"],\n    description: "Evaluates basic conversation elements",\n    validate: async (runtime: IAgentRuntime, message: Memory) => true,\n    handler: async (runtime: IAgentRuntime, message: Memory) => {\n        // Evaluation logic here\n        return result;\n    },\n    examples: [],\n};\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"built-in-evaluators",children:"Built-in Evaluators"}),"\n",(0,r.jsx)(n.h3,{id:"fact-evaluator",children:"Fact Evaluator"}),"\n",(0,r.jsx)(n.p,{children:"The fact evaluator extracts and stores factual information from conversations."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'interface Fact {\n    claim: string;\n    type: "fact" | "opinion" | "status";\n    in_bio: boolean;\n    already_known: boolean;\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Source: ",(0,r.jsx)(n.a,{href:"https://github.com/elizaos/eliza/blob/main/packages/core/src/types.ts",children:"https://github.com/elizaos/eliza/blob/main/packages/core/src/types.ts"})]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Example Facts:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n    "claim": "User completed marathon training",\n    "type": "fact",\n    "in_bio": false,\n    "already_known": false\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"goal-evaluator",children:"Goal Evaluator"}),"\n",(0,r.jsx)(n.p,{children:"From bootstrap plugin - tracks conversation goals:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'interface Goal {\n    id: string;\n    name: string;\n    status: "IN_PROGRESS" | "DONE" | "FAILED";\n    objectives: Objective[];\n}\n\ninterface Objective {\n    description: string;\n    completed: boolean;\n}\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsx)(n.h3,{id:"fact-extraction",children:"Fact Extraction"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Validate facts before storage"}),"\n",(0,r.jsx)(n.li,{children:"Avoid duplicate entries"}),"\n",(0,r.jsx)(n.li,{children:"Include relevant context"}),"\n",(0,r.jsx)(n.li,{children:"Properly categorize information types"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"goal-tracking",children:"Goal Tracking"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Define clear, measurable objectives"}),"\n",(0,r.jsx)(n.li,{children:"Update only changed goals"}),"\n",(0,r.jsx)(n.li,{children:"Handle failures gracefully"}),"\n",(0,r.jsx)(n.li,{children:"Track partial progress"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"validation",children:"Validation"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Keep validation logic efficient"}),"\n",(0,r.jsx)(n.li,{children:"Check prerequisites first"}),"\n",(0,r.jsx)(n.li,{children:"Consider message content and state"}),"\n",(0,r.jsx)(n.li,{children:"Use appropriate memory managers"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"handler-implementation",children:"Handler Implementation"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Use runtime services appropriately"}),"\n",(0,r.jsx)(n.li,{children:"Store results in correct memory manager"}),"\n",(0,r.jsx)(n.li,{children:"Handle errors gracefully"}),"\n",(0,r.jsx)(n.li,{children:"Maintain state consistency"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"examples",children:"Examples"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Provide clear context descriptions"}),"\n",(0,r.jsx)(n.li,{children:"Show typical trigger messages"}),"\n",(0,r.jsx)(n.li,{children:"Document expected outcomes"}),"\n",(0,r.jsx)(n.li,{children:"Cover edge cases"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"creating-custom-evaluators",children:"Creating Custom Evaluators"}),"\n",(0,r.jsx)(n.p,{children:"Implement the Evaluator interface:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"interface Evaluator {\n    name: string;\n    similes: string[];\n    description: string;\n    validate: (runtime: IAgentRuntime, message: Memory) => Promise<boolean>;\n    handler: (\n        runtime: IAgentRuntime,\n        message: Memory,\n        state?: State,\n        options?: any,\n    ) => Promise<any>;\n    examples: EvaluatorExample[];\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Source: ",(0,r.jsx)(n.a,{href:"https://github.com/elizaos/eliza/blob/main/packages/core/src/types.ts",children:"https://github.com/elizaos/eliza/blob/main/packages/core/src/types.ts"})]}),"\n",(0,r.jsx)(n.h3,{id:"memory-integration",children:"Memory Integration"}),"\n",(0,r.jsx)(n.p,{children:"Example of storing evaluator results:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'try {\n    const memory = await runtime.memoryManager.addEmbeddingToMemory({\n        userId: user?.id,\n        content: { text: evaluationResult },\n        roomId: roomId,\n        embedding: await embed(runtime, evaluationResult),\n    });\n\n    await runtime.memoryManager.createMemory(memory);\n} catch (error) {\n    console.error("Failed to store evaluation result:", error);\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Source: ",(0,r.jsx)(n.a,{href:"https://github.com/elizaos/eliza/blob/main/packages/core/src/tests/memory.test.ts",children:"https://github.com/elizaos/eliza/blob/main/packages/core/src/tests/memory.test.ts"})]}),"\n",(0,r.jsx)(n.h3,{id:"memory-usage",children:"Memory Usage"}),"\n",(0,r.jsx)(n.p,{children:"Evaluators should use runtime memory managers for storage:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'const memoryEvaluator: Evaluator = {\n    name: "MEMORY_EVAL",\n    handler: async (runtime: IAgentRuntime, message: Memory) => {\n        // Store in message memory\n        await runtime.messageManager.createMemory({\n            id: message.id,\n            content: message.content,\n            roomId: message.roomId,\n            userId: message.userId,\n            agentId: runtime.agentId,\n        });\n\n        // Store in description memory\n        await runtime.descriptionManager.createMemory({\n            id: message.id,\n            content: { text: "User description" },\n            roomId: message.roomId,\n            userId: message.userId,\n            agentId: runtime.agentId,\n        });\n    },\n};\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"integration-with-agent-runtime",children:"Integration with Agent Runtime"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"/api/classes/AgentRuntime",children:"AgentRuntime"})," processes evaluators through its ",(0,r.jsx)(n.a,{href:"/api/classes/AgentRuntime#evaluate",children:"evaluate"})," method:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"// Register evaluator\nruntime.registerEvaluator(customEvaluator);\n\n// Process evaluations\nconst results = await runtime.evaluate(message, state);\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"error-handling",children:"Error Handling"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:'const robustEvaluator: Evaluator = {\n    name: "ROBUST_EVAL",\n    handler: async (runtime: IAgentRuntime, message: Memory) => {\n        try {\n            // Attempt evaluation\n            await runtime.messageManager.createMemory({\n                id: message.id,\n                content: message.content,\n                roomId: message.roomId,\n                userId: message.userId,\n                agentId: runtime.agentId,\n            });\n        } catch (error) {\n            // Log error and handle gracefully\n            console.error("Evaluation failed:", error);\n\n            // Store error state if needed\n            await runtime.messageManager.createMemory({\n                id: message.id,\n                content: { text: "Evaluation failed" },\n                roomId: message.roomId,\n                userId: message.userId,\n                agentId: runtime.agentId,\n            });\n        }\n    },\n};\n'})})]})}function m(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>l});var t=a(96540);const r={},s=t.createContext(r);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);