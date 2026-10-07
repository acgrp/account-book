<template>
  <div class="outer">
    <Header
      @user-logout="emit('user-logout')"
      @go-home="emit('go-home')"
      @go-options-transaction="emit('go-options-transaction')"
      @go-options-budget="emit('go-options-budget')"
      @go-options-report="emit('go-options-report')"
    />
    <div class="main-monitor">
      <div class="left-side-menu">
        <div
          class="side-menu-title text-select"
          @click="router.push({ name: 'options/transactionDate' })"
        >
          거래내역 상세조회
        </div>
        <RouterLink
          :to="{ name: 'options/transactionDate' }"
          class="router-link text-select"
          >날짜별 거래내역</RouterLink
        >
        <RouterLink
          :to="{ name: 'options/transactionCategory' }"
          class="router-link text-select"
          >카테고리별 거래내역</RouterLink
        >
        <br />
        <div
          class="side-menu-title text-select"
          @click="router.push({ name: 'options/budget' })"
        >
          예산 확인
        </div>
        <RouterLink
          :to="{ name: 'options/budget' }"
          class="router-link text-select"
          >예산 확인</RouterLink
        >
        <RouterLink
          :to="{ name: 'options/budget-setting' }"
          class="router-link text-select"
          >예산 설정</RouterLink
        >
        <br />
        <RouterLink
          :to="{ name: 'options/moneyreport' }"
          class="side-menu-title text-select"
          >월별 리포트</RouterLink
        >
      </div>
      <RouterView class="router" />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import BudgetInOptions from '@/pages/BudgetSetting/BudgetInOptions.vue';
import Report from '@/pages/MoneyReport/Report.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['user-logout']);

const router = useRouter();
</script>
<style scoped>
.main-monitor {
  /* 화면 디자인 */
  margin: 50px 20px 0;
  padding: 40px 40px 0;
  background-color: white;
  border-radius: 60px 60px 0 0;
  border-top: 3px rgb(123, 76, 161) solid;
  border-left: 3px rgb(123, 76, 161) solid;
  border-right: 3px rgb(123, 76, 161) solid;

  /* 구성요소 배치 */
  display: flex;
}
.left-side-menu {
  display: flex;
  flex-direction: column;
  text-align: end;
  width: 200px;
  padding-right: 20px;
  padding-bottom: 100px;
  border-right: 1px rgb(248, 244, 254) solid;
}

.side-menu-title {
  text-decoration: none;
  color: black;
  text-align: end;
  margin-top: 10px;
  font-size: 25px;
  cursor: pointer;
}

.router-link {
  text-decoration: none;
  color: #828282;
  margin-top: 3px;
}

.router {
  width: 1054px;
  padding-left: 60px;
  padding-bottom: 50px;
}

@media (max-width: 767px) {
  .main-monitor {
    margin: 16px 8px 0;
    padding: 22px 12px 0;
    border-radius: 26px 26px 0 0;
    display: block;
  }

  .left-side-menu {
    width: 100%;
    padding: 0 0 16px;
    border-right: 0;
    border-bottom: 1px solid rgb(248, 244, 254);
    text-align: left;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 12px;
  }

  .side-menu-title {
    margin-top: 0;
    font-size: 1rem;
    text-align: left;
  }

  .router-link {
    margin-top: 0;
    font-size: 0.82rem;
  }

  .left-side-menu br {
    display: none;
  }

  .router {
    width: 100%;
    padding: 22px 0 30px;
  }
}
</style>
