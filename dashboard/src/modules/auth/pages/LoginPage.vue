<script setup lang="ts">
import type { CheckOtpDTO } from '@/api/dto/checkOtpDTO.js';
import type { SendOtpDTO } from '@/api/dto/sendOtpDTO.js';
import { useRouter } from 'vue-router';
import { useLoginCheckOtp, useLoginSendOtp, useOAuthRequest, useGetUser } from '../common/composable/auth.composable.js';
import BaseInput from '@/common/components/form/BaseInput.vue';
import { numbersOnly } from '@/common/utilities/masks';
import BaseSelect from '@/common/components/form/BaseSelect.vue';
import BaseButton from '@/common/components/BaseButton.vue';
import { useUserStore } from '@/stores/user.store';
import { useGetCountry } from '../common/composable/country.composable';

const mobilePrefix = $ref('98')

const mobile = $ref('');
const referal = $ref('');
const otp = $ref('');

const userStore = useUserStore();
const router = useRouter()

const { loginSendOtp, error, isLoading } = useLoginSendOtp()
const { loginCheckOtp, token } = useLoginCheckOtp()
const { oAuthRequest } = useOAuthRequest()
const { getUser, userModel } = useGetUser()

const { data: countryList } = useGetCountry()

let isCode = $ref(false)

async function handleSendOtp() {

    const formData: SendOtpDTO = {
        mobile: mobile,
        mobilePrefix: mobilePrefix
    }

    try {
        await loginSendOtp(formData)

        isCode = true

    } catch (e) {
        console.log(e);
    }

}

async function handleCheckOtp() {

    const formData: CheckOtpDTO = {
        mobile: mobile,
        mobilePrefix: mobilePrefix,
        code: referal
    }

    try {
        await loginCheckOtp(formData)

        // save the user credentials
        userStore.setIsLoggedIn(true);
        userStore.setToken(token.value as string);
        localStorage.setItem("access-token", token.value as string);

        await handleGetUser()

        router.push('/');

    } catch (e) {
        console.log(e);
    }

}

async function handleGetUser() {
    try {
        await getUser()
        userStore.setEmail(userModel.value?.email as string)
        userStore.setMobile(userModel.value?.mobile as string)
    } catch (e) {
        console.log(e);
    }
}

async function handleOAthRequest() {
    try {
        await oAuthRequest()
    } catch (e) {
        console.log('oAuth request => ', e);
    }
}

</script>

<template>
    <div class="auth">
        <div class="auth__page">
            <div class="auth__page--content">
                <span class="v-fs-1 v-fw-bold v-color-base">وارد شوید</span>
                <span class="v-fs-2 v-color-gray mt-4 mb-5">خوش آمدید،لطفا برای ورود از <br /> طریق یکی از روش ها اقدام
                    کنید</span>

                <BaseSelect v-model="mobilePrefix" html-label="نام کشور" :options="countryList"
                    label="name" reduce-value="callingCode" class="login__input">

                    <template #option="{ data }">
                        <div class="d-flex justify-between">
                            <img :src="data.flagImage" width="25" height="20" alt="...">
                            <span>{{ data.name }}</span>
                            <span>{{ data.callingCode[0] }}+</span>
                        </div>
                    </template>

                    <template #selected-option="{ data, title }">
                        <div style="display: flex; align-items: baseline">
                            <img :src="data.flagImage" width="25" height="20" alt="..." />
                            <strong class="mr-2">{{ data.name }}</strong>
                        </div>
                    </template>


                </BaseSelect>

                <BaseInput v-model="mobile" :filters="[numbersOnly]" :readonly="isCode" html-label="شماره موبایل"
                    type="tel" name="mobile" class="login__input" hint="09156248303" />

                <BaseButton title="ورود" @click="handleSendOtp" v-if="!isCode" class="login__button" />

                <BaseInput v-model="referal" html-label="کد" name="referal" v-if="isCode" class="login__input" />
                <!-- <span class="v-color-base mt-4">یا ورود با</span> -->

                <!-- <img class="mt-3 login__google" @click="handleCheckOtp" src="../common/assets/Google.svg" alt="..." /> -->

                <BaseButton title="تایید" @click="handleCheckOtp" v-if="isCode" class="login__button mt-3" />

            </div>
            <div class="auth__page--banner">
                <img class="vector-l" src="../common/assets/login-vector-l.svg" alt="...">
                <img class="vector-r" src="../common/assets/login-vector-r.svg" alt="...">
                <div class="banner__content">
                    <div class="banner__content--svg">
                        <img src="../common/assets/login-cover.svg" alt="...">
                    </div>
                    <div class="banner__content--title mt-5">
                        <span class="v-fs-1 v-fw-bold">بهترین معاملات در کریپتو سیگنال</span>
                        <span class="v-fs-3 mt-4">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط کاربردی می
                            باشد.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.auth {
    height: 100vh;
    width: 100%;
    padding: 25px;

    .login__button {
        width: 60%;
        background: linear-gradient(180deg, #163172 0%, #1E56A0 100%);
        border-radius: 10px;
        color: #fff;
        height: 54px;
        font-size: 22px;
        border: none;

        &:hover {
            box-shadow: 0px 12px 13px -1px rgba(30, 86, 160, 0.2);
        }
    }

    .login__google {
        cursor: pointer;
        border-radius: 50%;
        transition: all 200ms;
        border: 1px solid transparent;

        &:hover {
            border-color: var(--base-color);
        }
    }

    .login__input {
        width: 60%;
    }

    &__page {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &--banner {
            width: 40vw;
            height: 100%;
            background-color: var(--base-color);
            border-radius: 30px;
            position: relative;
            overflow: hidden;

            .vector-l {
                position: absolute;
                left: 0;
                top: 0;
                width: 12rem;
            }

            .vector-r {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 8rem;
            }
        }

        &--content {
            width: 40vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    .banner__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 70px;

        // &--svg {}

        &--title {
            display: flex;
            flex-direction: column;
            text-align: center;
            color: #fff;
        }
    }
}
</style>