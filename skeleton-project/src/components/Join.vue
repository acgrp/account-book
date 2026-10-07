<template>
  <div class="outer join-page">
    <div class="main-monitor">
      <h1>회원가입</h1>
      <div class="options-main-container join-main-monitor">
        <label
          ><div>이름/닉네임</div>
          <input type="text" v-model.trim="userName"
        /></label>
        <div>
          <label
            ><div>아이디</div>
            <input type="text" v-model.trim="userID"
          /></label>
          <div class="btn" @click="checkID">중복확인</div>
        </div>

        <div class="text-danger fs-6" v-if="usedID === 1">
          <p>사용중인 아이디입니다.</p>
        </div>
        <div class="text-success" v-if="usedID === 2">
          <p>사용 가능한 아이디입니다.</p>
        </div>

        <label
          ><div>비밀번호</div>
          <input type="password" v-model.trim="userPW"
        /></label>
        <div>
          <p>
            {{ userPW.length < 8 ? '8자 이상 입력해주세요.' : '' }}
          </p>
        </div>
        <div>
          <label
            ><div>비밀번호 확인</div>
            <input type="password" v-model.trim="userPWChecked"
          /></label>
          <div>
            <p class="text-danger">
              {{
                userPW === userPWChecked && userPWChecked !== ''
                  ? ''
                  : '비밀번호가 일치하지 않습니다.'
              }}
            </p>
          </div>
        </div>

        <div><button @click="checkFullForm">SUBMIT</button></div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Footer from './Footer.vue';

// 이벤트 전달
const emit = defineEmits(['new-user']);

// 입력받을 정보를 담을 변수 선언
const userName = ref('');
const userID = ref('');
const userPW = ref('');
const userPWChecked = ref('');

// id 중복확인 로직
const usedID = ref(0);
const checkID = async () => {
  const resp = await axios.get('/api/users');
  const data = resp.data;
  for (let i = 0; i < data.length; i++) {
    if (data[i].userID === userID.value) {
      usedID.value = 1;
      userID.value = '';
      return;
    }
  }
  usedID.value = 2;
};

// 새로운 유저의 정보를 db.json에 넘기는 함수
// emit을 통해 App.vue에서 /login 화면으로 이동
const postNewUser = async () => {
  const newUser = {
    userID: userID.value,
    userPW: userPW.value,
    userName: userName.value,
    moneyList: [],
    userBudget: [],
  };
  // console.log(newUser);

  // 서버로 새로운 User에 대한 정보 진행
  const resp = await axios.post('/api/users', newUser);
  // console.log(resp.data);

  emit('new-user');
  console.log('회원가입 이벤트 전달');
};

// 입력받은 값의 유효성을 검사한 뒤 새로운 유저의 정보를 db.json에 넘기는 함수 호출
const checkFullForm = () => {
  if (userName.value.length === 0) {
    alert('이름을 입력해주세요');
    return;
  }

  if (usedID.value === 1) {
    alert('중복된 아이디를 수정해주세요');
    return;
  }

  if (usedID.value !== 2) {
    alert('아이디를 입력하거나 중복확인을 해주세요');
    return;
  }

  const hasLetter = userPW.value.replace(/[^a-zA-Z ]/g, '').length !== 0;
  const hasNumber = userPW.value.replace(/[^0-9]/g, '').length !== 0;
  if (!hasLetter || !hasNumber || userPW.value.length < 8) {
    alert('비밀번호를 다시 설정해주세요');
    return;
  }

  if (userPW.value !== userPWChecked.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  postNewUser();
};
</script>
<style scoped>
/* ── 메인 모니터 컨테이너 ── */
.main-monitor {
  margin: 50px 20px 0;
  padding: 40px 40px 0;
  background-color: white;
  border-radius: 60px 60px 0 0;
  border-top: 3px rgb(123, 76, 161) solid;
  border-left: 3px rgb(123, 76, 161) solid;
  border-right: 3px rgb(123, 76, 161) solid;
}

.join-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.join-page .main-monitor {
  width: min(calc(100% - 40px), 920px);
  margin: 36px auto 0;
  padding: 30px 34px 0;
}

.join-main-monitor {
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 30px 0 45px;
}

.join-page > .footer {
  margin-top: auto;
}

/* ── REGISTER 타이틀 ── */
.main-monitor > h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: #6b4fa0;
  letter-spacing: 4px;
  margin-bottom: 28px;
  text-transform: uppercase;
}

/* ── 폼 내부 컨테이너 ── */
.join-main-monitor {
  padding: 30px 80px 45px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

/* ── 공통 레이블 (label 태그) ── */
.join-main-monitor label {
  display: flex;
  align-items: center;
}

/* 레이블 텍스트 div */
.join-main-monitor label > div {
  width: 130px;
  min-width: 130px;
  text-align: right;
  padding-right: 18px;
  color: #999;
  font-size: 0.9rem;
}

/* ── 공통 인풋 ── */
.join-main-monitor input[type='text'],
.join-main-monitor input[type='password'] {
  flex: 1;
  padding: 10px 15px;
  border: 1.5px solid #c5aae0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.join-main-monitor input:focus {
  border-color: #7b4ca1;
  box-shadow: 0 0 0 3px rgba(123, 76, 161, 0.12);
}

/* ── 아이디 행 (label + 중복확인 버튼 + 에러) ── */
.join-main-monitor > div:has(.btn) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.join-main-monitor > div:has(.btn) > label {
  flex: 1;
}

.join-main-monitor > div:has(.btn) > .text-danger {
  width: 100%;
  padding-left: 148px;
  font-size: 0.8rem;
  color: #d9534f;
  min-height: 1.2em;
}

/* 중복확인 버튼 */
.btn {
  padding: 10px 18px;
  background-color: #b5a0d0;
  color: white;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  margin-left: 10px;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #7b4ca1;
}

/* ── 비밀번호 힌트 (p 태그만 가진 div) ── */
.join-main-monitor > div:has(> p) {
  padding-left: 148px;
  margin-top: -8px;
}

.join-main-monitor > div:has(> p) > p {
  color: #a08cc0;
  font-size: 0.8rem;
  margin: 0;
}

/* ── 비밀번호 확인 행 (label + 에러 메시지 div) ── */
.join-main-monitor > div:has(> label):not(:has(.btn)) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.join-main-monitor > div:has(> label):not(:has(.btn)) > div {
  padding-left: 148px;
}

.join-main-monitor > div:has(> label):not(:has(.btn)) > div p {
  color: #d9534f;
  font-size: 0.8rem;
  margin: 0;
}

/* ── HR 구분선 ── */
.join-main-monitor hr {
  border: none;
  border-top: 1.5px solid #c5aae0;
  margin: 4px 0;
}

/* ── SUBMIT 버튼 ── */
.join-main-monitor > div:has(> button) {
  display: flex;
  padding-left: 148px;
}

.join-main-monitor button {
  flex: 1;
  padding: 13px;
  background-color: #b5a0d0;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 3px;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;
}

.join-main-monitor button:hover {
  background-color: #7b4ca1;
}

@media (max-width: 767px) {
  .join-page .main-monitor {
    width: auto;
    margin: 18px 10px 0;
    padding: 26px 12px 0;
    border-radius: 28px 28px 0 0;
  }

  .main-monitor > h1 {
    font-size: 1.7rem;
    letter-spacing: 2px;
    margin-bottom: 18px;
  }

  .join-main-monitor {
    padding: 20px 10px 30px;
    gap: 16px;
  }

  .join-main-monitor label,
  .join-main-monitor > div:has(.btn) > label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .join-main-monitor label > div {
    width: auto;
    min-width: 0;
    padding: 0 0 6px;
    text-align: left;
    font-size: 0.95rem;
  }

  .join-main-monitor input[type='text'],
  .join-main-monitor input[type='password'] {
    width: 100%;
    padding: 12px;
  }

  .join-main-monitor > div:has(.btn) {
    align-items: stretch;
  }

  .join-main-monitor > div:has(.btn) > .btn {
    align-self: flex-end;
    margin: 8px 0 0;
  }

  .join-main-monitor > div:has(.btn) > .text-danger,
  .join-main-monitor > div:has(> p),
  .join-main-monitor > div:has(> label):not(:has(.btn)) > div,
  .join-main-monitor > div:has(> button) {
    padding-left: 0;
  }

  .join-main-monitor > div:has(> label):not(:has(.btn)) > div {
    width: 100%;
  }

  .join-main-monitor button {
    width: 100%;
  }
}
</style>
