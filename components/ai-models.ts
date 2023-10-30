export const models = [
  // {
  //   id: "llama2-13b",
  //   name: "LLAMA2 13B Chat (4K Context)",
  //   options: {
  //     temperature: {
  //       default: 0.75,
  //       max: 2,
  //       min: 0,
  //       step: 0.1,
  //     },
  //     topP: {
  //       default: 0.9,
  //       max: 1,
  //       min: 0,
  //       step: 0.01,
  //     },
  //     topK: {
  //       default: 50,
  //       max: 100,
  //       min: 0,
  //       step: 1,
  //     },
  //     maxTokens: {
  //       default: 128,
  //       max: 2000,
  //       min: 100,
  //       step: 1,
  //     },
  //   },
  // },
  {
    id: "gpt-4",
    name: "GPT-4 (32K Context)",
    options: {
      temperature: {
        default: 1,
        max: 2,
        min: 0,
        step: 0.1,
      },
      topP: {
        default: 1,
        max: 1,
        min: 0,
        step: 0.01,
      },
      maxTokens: {
        default: 4000,
        max: 6000,
        min: 100,
        step: 1,
      },
      frequencyPenalty: {
        default: 0,
        max: 2,
        min: -2,
        step: 0.1,
      },
      presencePenalty: {
        default: 0,
        max: 2,
        min: -2,
        step: 0.1,
      },
    },
  },
  {
    id: "gpt35-16k",
    name: "GPT-3.5 (16K Context)",
    options: {
      temperature: {
        default: 1,
        max: 2,
        min: 0,
        step: 0.1,
      },
      topP: {
        default: 1,
        max: 1,
        min: 0,
        step: 0.01,
      },
      maxTokens: {
        default: 4000,
        max: 6000,
        min: 100,
        step: 1,
      },
      frequencyPenalty: {
        default: 0,
        max: 2,
        min: -2,
        step: 0.1,
      },
      presencePenalty: {
        default: 0,
        max: 2,
        min: -2,
        step: 0.1,
      },
    },
  },
  // {
  //   id: "text-davinci-003",
  //   name: "DaVinci-003 (4K Context)",
  //   options: {
  //     temperature: {
  //       default: 1,
  //       max: 2,
  //       min: 0,
  //       step: 0.1,
  //     },
  //     topP: {
  //       default: 1,
  //       max: 1,
  //       min: 0,
  //       step: 0.01,
  //     },
  //     maxTokens: {
  //       default: 400,
  //       max: 2000,
  //       min: 100,
  //       step: 1,
  //     },
  //     frequencyPenalty: {
  //       default: 0,
  //       max: 2,
  //       min: -2,
  //       step: 0.1,
  //     },
  //     presencePenalty: {
  //       default: 0,
  //       max: 2,
  //       min: -2,
  //       step: 0.1,
  //     },
  //   },
  // },
];
