<template>
  <div class="outer">
    <Header @user-logout="emit('user-logout')" @go-home="emit('go-home')"
      @go-options-transaction="emit('go-options-transaction')" @go-options-budget="emit('go-options-budget')"
      @go-options-report="emit('go-options-report')" />

    <div class="main-monitor">
      <Budget />
      <div class="row g-4 mt-3 content-row">
        <div class="calendar-column col-xl-7 col-lg-12 d-flex flex-column">
          <router-view></router-view>
        </div>
        <div
          class="transaction-column col-xl-5 col-lg-12 d-flex flex-column"
          :class="{ 'mobile-open': showTransactions }"
        >
          <div class="mobile-sheet-header">
            <strong>거래내역</strong>
            <button type="button" @click="showTransactions = false">닫기</button>
          </div>
          <router-view name="right"></router-view>
        </div>
      </div>
      <button
        class="mobile-transaction-trigger"
        type="button"
        @click="showTransactions = true"
      >
        거래내역 보기
      </button>
      <div
        v-if="showTransactions"
        class="mobile-sheet-backdrop"
        @click="showTransactions = false"
      ></div>
    </div>

    <Footer />
  </div>
</template>
<script setup>
import Calender from '@/components/Calender.vue';
import Budget from './Budget.vue';
import Header from './Header.vue';
import MoneyList from './MoneyList.vue';
import Footer from './Footer.vue';
import { ref } from 'vue';

const showTransactions = ref(false);

const emit = defineEmits([
  'user-logout',
  'go-home',
  'go-options-transaction',
  'go-options-budget',
  'go-options-report',
]);
</script>
<style>
.outer {
  background-color: rgb(248, 244, 254);
}

.main-monitor {
  /* 화면 디자인 */
  margin: 50px 20px 0;
  padding: 40px 40px 60px;
  /* 0 -> 60 */
  background-color: white;
  border-radius: 60px 60px 0 0;
  border-top: 3px rgb(123, 76, 161) solid;
  border-left: 3px rgb(123, 76, 161) solid;
  border-right: 3px rgb(123, 76, 161) solid;
}

/* 👇 예산(Budget)에는 영향이 가지 않도록 content-row에만 적용합니다 */
.content-row {
  align-items: stretch !important;
  /* 기둥 높이를 무조건 동일하게 맞춤 */
}

/* 달력과 목록이 공간을 100% 꽉 채우도록 강제 설정 */
.content-row>div>* {
  flex: 1;
  height: 100% !important;
  max-height: 650px !important;
  /* 여기서 650px로 절대 고정 */
}

.mobile-transaction-trigger,
.mobile-sheet-header,
.mobile-sheet-backdrop {
  display: none;
}

@media (max-width: 767px) {
  .main-monitor {
    margin: 16px 8px 0;
    padding: 18px 10px 24px;
    border-radius: 26px 26px 0 0;
  }

  .content-row {
    display: block;
    margin-top: 16px !important;
  }

  .calendar-column,
  .transaction-column {
    width: 100%;
    padding: 0;
  }

  .calendar-column > * {
    height: auto !important;
    max-height: none !important;
  }

  .mobile-transaction-trigger {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 14px;
    padding: 12px 16px;
    border: 0;
    border-radius: 14px;
    background: #bfa5d4;
    color: white;
    font: inherit;
    font-weight: bold;
  }

  .transaction-column {
    display: none !important;
  }

  .transaction-column.mobile-open {
    display: flex !important;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
    max-height: 82svh;
    padding: 0 12px 12px;
    overflow: hidden;
    background: white;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -8px 30px rgba(69, 43, 88, 0.2);
  }

  .transaction-column.mobile-open .list-container {
    height: auto !important;
    max-height: calc(82svh - 58px) !important;
    width: 100%;
  }

  .mobile-sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 auto;
    padding: 14px 4px 10px;
    color: #7b4ca1;
  }

  .mobile-sheet-header button {
    border: 0;
    border-radius: 999px;
    padding: 6px 12px;
    background: #f3eeff;
    color: #7b4ca1;
    font: inherit;
  }

  .mobile-sheet-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1090;
    background: rgba(33, 24, 42, 0.42);
  }
}
</style>
