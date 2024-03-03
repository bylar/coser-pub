<template>
  <h1 style="width: 700px;">WELCOME！<b class="opacity-wave">-</b></h1>
  <progress v-show="loading < 100" class="nes-progress is-pattern loading" :value="loading" max="100"></progress>
  <section v-show="loading === 100" class="nes-container box slide-in-elliptic-top-fwd"
    style="border-style: dashed; animation-delay: 0.2s;">
    <img :src="gif" style="position: absolute; right: 10px; bottom: 10px;">
    <section class="message-list">
      <section class="message -left slide-in-right" :style="`animation-delay: ${0.7 + 0.04}s;`">
        <img class="nes-avatar is-large avatar" referrerpolicy="no-referrer"
          src="https://i0.hdslb.com/bfs/face/240248132aab51c85a58108a8878641d8df49163.jpg">
        <div class="nes-balloon from-left slide-in-right item">
          <b>你好，我是诺诺！</b>
        </div>
      </section>
      <section v-for="(i, k) in socialList" class="message -right slide-in-right"
        :style="`animation-delay: ${0.7 + (k + 1) * 0.04}s;`">
        <img class="nes-avatar is-large avatar" referrerpolicy="no-referrer"
          src="https://i0.hdslb.com/bfs/face/240248132aab51c85a58108a8878641d8df49163.jpg">
        <p class="nes-balloon is-small from-left nes-pointer  item">
          {{ i.tip }}
          <a @click="i.action()" class="nes-badge is-icon size-wave">
            <span class="is-warning icon-box">
              <i :class="`icf-${i.icon} iconfont`" style="font-size: 24px;"></i>
            </span>
            <span class="is-primary"> <b>{{ i.account }}</b> </span>
          </a>
        </p>
      </section>

    </section>
    <section v-show="message" class="nes-dialog is-rounded swing-in-top-bck" id="dialog-rounded">
      <form method="dialog">
        <p class="title">💕💕💕</p>
        <p>{{ message }}</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary" @click="message = ''">好的喵</button>
        </menu>
      </form>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import gif from '@/assets/15.gif';
const loading = ref(0);
const message = ref('');
const interval = setInterval(() => {
  loading.value += 5;
  if (loading.value >= 100) clearInterval(interval);
}, 50);
const avatar = 'https://i0.hdslb.com/bfs/face/240248132aab51c85a58108a8878641d8df49163.jpg';
const _copyText = async (value: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return true;
  } else if (document.execCommand) {
    const input = document.createElement("input");
    input.readOnly = true;
    input.value = value;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('Copy');
    document.body.removeChild(input);
    return true;
  } else {
    return false;
  }
};

const socialList = reactive([
  {
    avatar, tip: '关注我的哔哩哔哩=w=', icon: 'bz', account: '@诺诺在神游', action: () => {
      window.open('https://space.bilibili.com/582306', '_blank');
    }
  },
  {
    avatar, tip: '抖音持续更新中！', icon: 'dy', account: '@诺诺在神游', action: () => {
      window.open('https://www.douyin.com/user/MS4wLjABAAAAcyVAX130BAl1ur1-e8h0oPiiwtHttt4hjQdxir-RyfI', '_blank');

    }
  },
  {
    avatar, tip: '小红书穿搭分享中~', icon: 'xhs', account: '@诺诺在神游', action: () => {
      window.open('https://www.xiaohongshu.com/user/profile/5b071208e8ac2b65dafd9662', '_blank');
    }
  },
  {
    avatar, tip: '#微博绝赞运营中#', icon: 'wb', account: '@诺诺在神游', action: () => {
      window.open('https://weibo.com/u/3519058857', '_blank');
    }
  },
  {
    avatar, tip: '粉丝群GET最新动态！', icon: 'qg', account: '784905311', action: async () => {
      const is_weixin = (function () { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 })();
      if (is_weixin) { // In Wechat
        await _copyText('784905311') && (message.value = '群号已复制到剪切板喵~')
      } else {
        window.open('http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=UQV8m5BnDqy61JP8vZ6bMIjQeax0H-6d&authKey=T6SsXAgLQyUf%2BfCohoYXv7fRa7FGPUIQ7WNc%2Ftfm4UBZi89Xan%2FGMlPAEHzA6lBm&noverify=0&group_code=784905311', '_blank');
      }
    }
  },
]);

</script>

<style scoped>
.avatar {
  border: 3px dashed #0000009d;
  border-radius: 50%;
  transform: translateY(20px);
  margin-right: 14px;
}

.nes-badge.is-icon {
  margin-left: 18px;
}

.item {
  font-size: 24px;
  background: repeating-linear-gradient(0deg, #d8d8d81c, transparent 10px),
    repeating-linear-gradient(90deg, #d8d8d81c, transparent 10px) #fff;

  &::before {
    background: repeating-linear-gradient(0deg, #d8d8d81c, transparent 10px),
      repeating-linear-gradient(90deg, #d8d8d81c, transparent 10px) #fff;
  }

  &::after {
    background: repeating-linear-gradient(0deg, #d8d8d81c, transparent 10px),
      repeating-linear-gradient(90deg, #d8d8d81c, transparent 10px) #fff;
  }
}

.box {
  font-weight: bolder;
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff31;
}

.nes-balloon {
  display: inline-flex;
  align-items: center;
  font-weight: bolder;
}

.loading {
  transition: all 0.3s ease;
}
</style>
