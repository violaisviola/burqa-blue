const INITIAL_STATE = {
  day: 1,
  time: "04:05",
  money: 650,
  energy: 100,

  relationships: {
    family: 70,
    laila: 70,
    hamid: 70,
    farzana: 50
  },

  independence: 50,
  risk: 10,
  happiness: 50,

  flags: {
    wentMarket: false,
    boughtBlueCloth: false,
    gaveBlueClothToLaila: false,
    keptBlueCloth: false,
    blueClothUndecided: false,

    acceptedSewing: false,
    askedSewingPrice: false,
    askedSewingDeadline: false,
    pendingIncome: 0,

    homeLearning: false,
    sisterLearningBond: false,

    prayedFajr: false,
    prayedDhuhr: false,
    prayedAsr: false,
    prayedMaghrib: false,
    prayedIsha: false
  },

  memories: []
};

let state = structuredClone(INITIAL_STATE);

const scenes = {
  START: {
    time: "04:05",
    label: "DAY 1 · FAJR",
    text: `你在天还没有亮的时候醒来。

屋子里很安静，远处清真寺传来声音。

母亲已经醒了，她从房间里出来，轻声叫了你一句。

“起来了？”

你点点头。`,
    choices: [
      { text: "继续", effect: () => { state.flags.prayedFajr = true; }, next: "FAJR_END" }
    ]
  },

  FAJR_END: {
    time: "04:30",
    label: "晨礼",
    text: `你完成晨礼，房间里重新安静下来。

窗外还是黑的。你躺回床上，闭上眼睛。`,
    choices: [
      { text: "睡一会儿", next: "BREAKFAST" }
    ]
  },

  BREAKFAST: {
    time: "05:43",
    label: "05:43 · 早餐",
    text: `你再次醒来，天已经亮了。

厨房里传来锅碗碰撞的声音。

你穿好衣服，走出去。

母亲正在整理早餐，桌上有茶和面包。

她看了一眼厨房角落，那里放着一个空了一半的面粉袋。

她说：

“面粉不多了。”

“今天最好买袋新的。”`,
    choices: [
      {
        text: "A　我去买。",
        effect: () => { state.independence += 2; state.relationships.family += 1; },
        next: "C02"
      },
      {
        text: "B　让 Hamid 买吧。",
        effect: () => { state.relationships.hamid += 2; state.relationships.family += 1; state.independence -= 1; },
        next: "MORNING_HOME"
      },
      {
        text: "C　家里还能撑一天。",
        effect: () => { state.relationships.family -= 1; state.independence += 1; },
        next: "MORNING_HOME"
      },
      {
        text: "D　爸爸什么时候回来？",
        next: "MORNING_HOME"
      }
    ]
  },

  C02: {
    time: "05:50",
    label: "早餐 · C02",
    text: `母亲没有马上回答。

她看了看你，又看了一眼门。

“你一个人？”`,
    choices: [
      {
        text: "A　很快就回来。",
        effect: () => { state.independence += 2; state.risk += 2; state.relationships.family -= 1; },
        next: "MORNING_HOME"
      },
      {
        text: "B　那我等 Hamid。",
        effect: () => { state.relationships.hamid += 1; state.risk -= 1; },
        next: "MORNING_HOME"
      },
      {
        text: "C　算了，我不去了。",
        effect: () => { state.risk -= 2; state.independence -= 1; state.relationships.family += 1; },
        next: "MORNING_HOME"
      },
      {
        text: "D　你觉得呢？",
        effect: () => { state.independence -= 1; state.relationships.family += 2; state.risk -= 1; },
        next: "MORNING_HOME"
      }
    ]
  },

  MORNING_HOME: {
    time: "06:30",
    label: "06:30 · 家里",
    text: `你坐在门口喝茶。

Sami 还没起床，母亲经过他的房间。

“Sami。”

没有回应。她又叫了一次。

“起来。”

里面传来声音：

“知道了。”

你笑了一下。`,
    choices: [
      { text: "继续", next: "MESSAGES" }
    ]
  },

  MESSAGES: {
    time: "07:10",
    label: "07:10 · 手机",
    text: `回到房间。

手机还有 31% 的电，有两个未读消息。

Hamid：
“我晚一点过去。”

Laila：
“姐姐，你醒了吗？”`,
    choices: [
      {
        text: "A　回复 Laila。",
        effect: () => { state.relationships.laila += 2; },
        next: "C04"
      },
      {
        text: "B　回复 Hamid。",
        effect: () => { state.relationships.hamid += 2; },
        next: "AFTER_MESSAGES"
      },
      {
        text: "C　两个都不回。",
        effect: () => { state.relationships.laila -= 1; state.relationships.hamid -= 1; state.independence += 1; },
        next: "AFTER_MESSAGES"
      }
    ]
  },

  C04: {
    time: "07:15",
    label: "07:15 · Laila",
    text: `几秒后：

“快来我这里。”

你走到Laila房间，她坐在床上，手里拿着一本旧书。

见你来了，她把书递给你。

“姐姐。”

“嗯？”

“我想学英语。”

你翻了几页书。

“为什么？”

她想了一下。

“以后有用。”`,
    choices: [
      {
        text: "A　可以。",
        effect: () => { state.relationships.laila += 3; },
        next: "AFTER_MESSAGES"
      },
      {
        text: "B　你想学什么？",
        effect: () => { state.relationships.laila += 2; state.independence += 1; },
        next: "AFTER_MESSAGES"
      },
      {
        text: "C　先把现在的东西学好。",
        effect: () => { state.relationships.laila -= 1; },
        next: "AFTER_MESSAGES"
      },
      {
        text: "D　我英语也不好。",
        effect: () => { state.relationships.laila += 2; state.flags.sisterLearningBond = true; },
        next: "AFTER_MESSAGES"
      }
    ]
  },

  AFTER_MESSAGES: {
    time: "08:00",
    label: "08:00 · 家里",
    text: `早餐已经差不多结束。

Sami 正在找自己的鞋。

母亲问：
“今天还去吗？”

Sami：
“去。”

母亲：
“那快一点。”

你拿起盘里最后一块面包，Sami 立刻扭头看着你。

“给我留一点。”

你把面包掰了一半给他。`,
    choices: [
      { text: "继续", next: "HAMID_ARRIVES" }
    ]
  },

  HAMID_ARRIVES: {
    time: "09:10",
    label: "09:10 · Hamid",
    text: `Hamid 来了，他站在门口。

“要去市场吗？”

母亲从厨房回答：

“面粉没了。”

Hamid 点点头，然后看向你。

“你要去吗？”`,
    choices: [
      {
        text: "A　去。",
        effect: () => { state.flags.wentMarket = true; state.energy -= 10; state.relationships.hamid += 2; state.independence += 1; state.risk += 1; },
        next: "MARKET"
      },
      {
        text: "B　不用，我留在家里。",
        effect: () => { state.risk -= 1; },
        next: "LUNCH"
      },
      {
        text: "C　我想买点东西。",
        effect: () => { state.flags.wentMarket = true; state.energy -= 10; state.independence += 2; state.risk += 1; },
        next: "MARKET"
      },
      {
        text: "D　你什么时候回来？",
        effect: () => { state.relationships.hamid += 1; },
        next: "LUNCH"
      }
    ]
  },

  MARKET: {
    time: "09:50",
    label: "09:50 · 市场",
    text: `你换好衣服，检查了一下手机后出门。

Hamid 走在前面，你跟在后面。

街上的声音比家里大很多。

汽车声、摩托车声、商贩叫卖声、脚步声……

有人正在搬货，有人坐在路边喝茶。`,
    choices: [
      { text: "继续", next: "FLOUR" }
    ]
  },

  FLOUR: {
    time: "10:15",
    label: "10:15 · 面粉",
    text: `Hamid 先去买茶，店主是他的老同学，两个人开始讨论价格。

你站在旁边。

面粉买好了，价格：
500 AFN

Hamid 付钱。

你看了一眼自己的钱包。
650 AFN

你又想起两周前看到的那块蓝色布料。`,
    choices: [
      { text: "继续", next: "C06" }
    ]
  },

  C06: {
    time: "10:30",
    label: "10:30 · 蓝色布料",
    text: `你绕路走到那家店门口，店主看见你。

“喜欢？”

你点点头。

“400。”

你摸了一下布料。

很普通，但颜色很好看。`,
    choices: [
      {
        text: "A　买。",
        effect: () => {
          state.money -= 400;
          state.independence += 3;
          state.happiness += 3;
          state.flags.boughtBlueCloth = true;
          addMemory("Mariam 买了一块蓝色的布。");
        },
        next: "C07"
      },
      {
        text: "B　不买。",
        next: "C07"
      },
      {
        text: "C　问能不能便宜一点。",
        next: "BARGAIN"
      }
    ]
  },

  BARGAIN: {
    time: "10:32",
    label: "10:32 · 砍价",
    text: `店主摇头。

“不能。”

你看着那块布，现在可以决定要不要买。`,
    choices: [
      {
        text: "买。",
        effect: () => {
          state.money -= 400;
          state.independence += 3;
          state.happiness += 3;
          state.flags.boughtBlueCloth = true;
          addMemory("Mariam 买了一块蓝色的布。");
        },
        next: "C07"
      },
      {
        text: "不买。",
        next: "C07"
      }
    ]
  },

  C07: {
    time: "11:40",
    label: "11:40 · 回家前",
    text: `太阳已经很高，你们准备回家。

Hamid 买了一杯茶，你们坐在路边。

他问：
“Laila 最近怎么样？”

你说：
“还好。”

“还想学东西？”

你点头。

Hamid 没说话，只是喝了一口茶。`,
    choices: [
      {
        text: "继续回家",
        next: "DHUHR"
      }
    ]
  },

  DHUHR: {
    time: "11:56",
    label: "11:56 · Dhuhr",
    text: `回家的路上，你注意到时间。今天的晌礼时间到了。

你们经过一处可以礼拜的地方，Hamid 停下来。

“我先去一下。”

你点头。`,
    choices: [
      {
        text: "A　一起去礼拜。",
        effect: () => { state.flags.prayedDhuhr = true; },
        next: "LUNCH"
      },
      {
        text: "B　在附近等。",
        next: "LUNCH"
      },
      {
        text: "C　先回家。",
        next: "LUNCH"
      }
    ]
  },

  LUNCH: {
    time: "13:05",
    label: "13:05 · 午饭",
    text: `回到家。

母亲已经准备好午饭。她看到面粉。

“买回来了？”

Hamid：
“嗯。”

母亲点点头，看着你手里的袋子。

Laila 直接凑到你跟前。

“你买了什么？”`,
    choices: [
      {
        text: "A　“给你的。”",
        condition: () => state.flags.boughtBlueCloth,
        effect: () => {
          state.flags.gaveBlueClothToLaila = true;
          state.flags.boughtBlueCloth = false;
          state.relationships.laila += 5;
          state.happiness += 3;
          addMemory("Mariam 把蓝色的布给了 Laila。");
        },
        next: "AFTER_CLOTH"
      },
      {
        text: "B　“是我的。”",
        condition: () => state.flags.boughtBlueCloth,
        effect: () => {
          state.flags.keptBlueCloth = true;
          state.relationships.laila += 1;
          state.independence += 2;
          addMemory("Mariam 把蓝色的布留给了自己。");
        },
        next: "AFTER_CLOTH"
      },
      {
        text: "C　“晚点告诉你。”",
        condition: () => state.flags.boughtBlueCloth,
        effect: () => {
          state.flags.blueClothUndecided = true;
          state.relationships.laila += 1;
        },
        next: "AFTER_CLOTH"
      },
      {
        text: "D “没什么。”",
        condition: () => !state.flags.boughtBlueCloth,
        next: "AFTER_CLOTH"
      }
    ]
  },

  AFTER_CLOTH: {
    time: "13:20",
    label: "13:20 · 午饭后",
    text: `午饭后。

Sami 躺在地毯上看手机，母亲让他去洗碗。

他没有动，母亲又说：

“Sami。”

“知道了。”

你笑了一下，Sami 看你。

“笑什么？”

“没什么。”`,
    choices: [
      { text: "继续", next: "QUIET_AFTERNOON" }
    ]
  },

  QUIET_AFTERNOON: {
    time: "15:10",
    label: "15:10 · 下午",
    text: `下午很安静。

你回到房间，手机响了。

是邻居 Farzana。

她问：
“你最近还做缝纫吗？”

你：
“偶尔。”

她：
“我这里有一些东西。”

“如果你愿意，可以帮我做。”

“做完给你钱。”`,
    choices: [
      {
        text: "A　多少钱？",
        effect: () => { state.flags.askedSewingPrice = true; },
        next: "SEWING_PRICE"
      },
      {
        text: "B　什么时候要？",
        effect: () => { state.flags.askedSewingDeadline = true; },
        next: "SEWING_DEADLINE"
      },
      {
        text: "C　我可以试试。",
        effect: () => { acceptSewing(); },
        next: "ASR"
      },
      {
        text: "D　最近不方便。",
        effect: () => { state.relationships.farzana -= 1; },
        next: "ASR"
      }
    ]
  },

  SEWING_PRICE: {
    time: "15:12",
    label: "15:12 · Farzana",
    text: `Farzana：

“300 AFN。”`,
    choices: [
      {
        text: "接受。",
        effect: () => { acceptSewing(); },
        next: "ASR"
      },
      {
        text: "不接受。",
        effect: () => { state.relationships.farzana -= 1; },
        next: "ASR"
      }
    ]
  },

  SEWING_DEADLINE: {
    time: "15:12",
    label: "15:12 · Farzana",
    text: `Farzana：

“明天下午之前。”`,
    choices: [
      {
        text: "接受。",
        effect: () => { acceptSewing(); },
        next: "ASR"
      },
      {
        text: "不接受。",
        effect: () => { state.relationships.farzana -= 1; },
        next: "ASR"
      }
    ]
  },

  ASR: {
    time: "15:38",
    label: "15:38 · Asr",
    text: `房间外传来母亲的声音。

“Mariam。”

你走出房间，她正在准备礼拜。

她问：
“你做完了吗？”

你摇摇头。

她：
“那先放一下。”

你暂时放下手里的事，完成晡礼。`,
    choices: [
      {
        text: "继续",
        effect: () => { state.flags.prayedAsr = true; },
        next: "LAILA_AFTERNOON"
      }
    ]
  },

  LAILA_AFTERNOON: {
    time: "16:20",
    label: "16:20 · Laila",
    text: `Laila 拿着早上的英语书走进你的房间。

“姐姐。”

“你昨天说过，如果我以后不能去学校……”

她没有继续说。

你看着她。`,
    choices: [
      {
        text: "A　我们可以在家里继续学。",
        effect: () => { state.relationships.laila += 4; state.flags.homeLearning = true; },
        next: "MAGHRIB"
      },
      {
        text: "B　你会有办法的。",
        effect: () => { state.relationships.laila += 2; },
        next: "MAGHRIB"
      },
      {
        text: "C　别想那么远。",
        effect: () => { state.relationships.laila -= 1; },
        next: "MAGHRIB"
      },
      {
        text: "D　我不知道。",
        effect: () => { state.happiness += 0; },
        next: "MAGHRIB"
      }
    ]
  },

  MAGHRIB: {
    time: "18:33",
    label: "18:33 · Maghrib",
    text: `天开始暗下来。

屋里慢慢安静，大家完成昏礼。`,
    choices: [
      {
        text: "继续",
        effect: () => { state.flags.prayedMaghrib = true; },
        next: "DINNER"
      }
    ]
  },

  DINNER: {
    time: "19:05",
    label: "19:05 · 晚饭",
    text: `一家人坐在一起吃晚饭，Sami 又拿出了手机。

母亲看了他一眼。

“吃饭的时候不要看。”

他撇着嘴把手机放下。

Hamid 笑了一下，母亲瞪了他一眼。

你忍不住笑了，母亲也笑了一下。`,
    choices: [
      { text: "继续", next: "ISHA" }
    ]
  },

  ISHA: {
    time: "19:46",
    label: "19:46 · Isha",
    text: `晚饭后，家里逐渐安静下来。

你完成宵礼。`,
    choices: [
      {
        text: "继续",
        effect: () => { state.flags.prayedIsha = true; },
        next: "NIGHT"
      }
    ]
  },

  NIGHT: {
    time: "20:10",
    label: "20:10 · 夜里",
    text: () => {
      const money = state.money;
      const cloth = state.flags.boughtBlueCloth
        ? "桌子旁边放着那块蓝色的布。"
        : state.flags.gaveBlueClothToLaila
          ? "那块蓝色的布已经不在你的房间里。"
          : "";

      return `你回到自己的房间，手机还有 12% 的电量。

Farzana 又发来一条消息：
“要记得哦。”

你看着这条消息，打开钱包。

${money} AFN

${cloth}

你躺下来，窗外还有一点声音。

你想到明天。`;
    },
    choices: [
      { text: "结束第一天", next: "DAY_END" }
    ]
  },

  DAY_END: {
    time: "20:10",
    label: "DAY 1 END",
    text: () => `今天结束了。

明天还有事情要做。

DAY 1 END`,
    choices: [
      { text: "查看 Day 1 状态", next: "STATE_END" },
      { text: "重新开始", action: resetGame }
    ]
  },

  STATE_END: {
    time: "20:10",
    label: "DAY 1 · STATE",
    text: () => buildStateSummary(),
    choices: [
      { text: "重新开始", action: resetGame }
    ]
  }
};

function acceptSewing() {
  state.flags.acceptedSewing = true;
  state.flags.pendingIncome = 300;
  state.relationships.farzana += 3;
  state.independence += 2;
  state.energy -= 5;
  addMemory("Mariam 接受了 Farzana 的缝纫工作。");
}

function addMemory(memory) {
  if (!state.memories.includes(memory)) state.memories.push(memory);
}

function clampState() {
  state.energy = Math.max(0, Math.min(100, state.energy));
  state.independence = Math.max(0, Math.min(100, state.independence));
  state.risk = Math.max(0, Math.min(100, state.risk));
  state.happiness = Math.max(0, Math.min(100, state.happiness));

  for (const key of Object.keys(state.relationships)) {
    state.relationships[key] = Math.max(0, Math.min(100, state.relationships[key]));
  }
}

function buildStateSummary() {
  const s = state;
  return `Day 1 结束。

金钱：${s.money} AFN
精力：${s.energy}
家庭：${s.relationships.family}
Laila：${s.relationships.laila}
Hamid：${s.relationships.hamid}
Farzana：${s.relationships.farzana}
独立性：${s.independence}
风险：${s.risk}

礼拜记录：
Fajr ${s.flags.prayedFajr ? "✓" : "—"}
Dhuhr ${s.flags.prayedDhuhr ? "✓" : "—"}
Asr ${s.flags.prayedAsr ? "✓" : "—"}
Maghrib ${s.flags.prayedMaghrib ? "✓" : "—"}
Isha ${s.flags.prayedIsha ? "✓" : "—"}

记忆：
${s.memories.length ? s.memories.map(x => "· " + x).join("\\n") : "· 暂无"}`;
}

function resetGame() {
  state = structuredClone(INITIAL_STATE);
  render("START");
}

function render(sceneId) {
  clampState();
  const scene = scenes[sceneId];

  const label = document.getElementById("sceneLabel");
  const story = document.getElementById("storyText");
  const choices = document.getElementById("choices");

  label.textContent = scene.label || "";
  story.textContent = typeof scene.text === "function" ? scene.text() : scene.text;
  choices.innerHTML = "";

  const availableChoices = (scene.choices || []).filter(choice => {
    return !choice.condition || choice.condition();
  });

  availableChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => {
      if (choice.effect) choice.effect();
      if (choice.action) {
        choice.action();
        return;
      }
      saveGame();
      render(choice.next);
    });
    choices.appendChild(btn);
  });

  updateHUD();
}

function updateHUD() {
  document.getElementById("timeStatus").textContent = state.time;
  document.getElementById("money").textContent = `${state.money} AFN`;
  document.getElementById("energy").textContent = state.energy;
  document.getElementById("family").textContent = state.relationships.family;
  document.getElementById("laila").textContent = state.relationships.laila;
  document.getElementById("hamid").textContent = state.relationships.hamid;

  document.getElementById("independence").textContent = state.independence;
  document.getElementById("debugState").textContent = JSON.stringify(state, null, 2);
}

function saveGame() {
  localStorage.setItem("burkaBlueV01State", JSON.stringify(state));
}

function loadGame() {
  const saved = localStorage.getItem("burkaBlueV01State");
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch {
      state = structuredClone(INITIAL_STATE);
    }
  }
}

document.getElementById("restartBtn").addEventListener("click", resetGame);

loadGame();
render("START");
