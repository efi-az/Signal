<script setup lang="ts">
import BaseRow from "@/common/components/BaseRow.vue";
import BaseCol from "@/common/components/BaseCol.vue";
import { useGetCoinList, useCoinSocket } from "../common/composable/coin.composable";
import { useGetUserSystemList } from "../common/composable/auth.composable";
import { georgianToJalali } from "@/common/utilities/dateConvertor"

// const { socket } = useCoinSocket()
// socket.on("prices", () => {
//     console.log("connected");
// })
// socket.emit("prices", ["btcusdt"])

const { data: coinList } = useGetCoinList()

const { data: userSystemList } = useGetUserSystemList()

const signalDetail = $ref(true)

</script>

<template>
    <div class="user-dashboard not-fill">
        <BaseRow>
            <BaseCol md="4">
                <div class="card">
                    <div class="card__header">
                        <div class="card__header--title">
                            <img src="@/common/assets/images/graph.svg" alt="...">
                            <span>وضعیت مارکت</span>
                        </div>
                        <!-- <div class="card__header--all">مشاهده همه</div> -->
                    </div>
                    <div class="card__body">
                        <div class="d-flex justify-between align-center">
                            <div class="d-flex flex-column">
                                <span class="v-color-gray">حجم کل بازار</span>
                                <span class="mt-2">879,779,036,125.547</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="v-color-gray">تغییرات 24 ساعت</span>
                                <span class="mt-2">38,026,730,653.2 دلار</span>
                            </div>
                        </div>
                        <div class="d-flex justify-between align-center mt-4">
                            <div class="d-flex flex-column">
                                <span class="v-color-gray">دامیننس بیتکوین</span>
                                <span class="mt-2">42.4%</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="v-color-gray">دامیننس اتریوم</span>
                                <span class="mt-2">42.4%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCol>
            <BaseCol md="2">
                <div class="user-dashboard__referral-img">
                    <img src="@/common/assets/images/user-referral.svg" alt="..." />
                    <span class="v-color-base v-fw-bold">دوستان خود رادعوت کنید تا از <br /> کریپتو سیگنال استفاده کنند
                        <br /> و هدیه بگیرید</span>
                </div>
            </BaseCol>
            <BaseCol md="6">
                <div class="card">
                    <div class="row justify-between">
                        <div class="col-md-5">
                            <div class="d-flex flex-column">
                                <div class="d-flex flex-column">
                                    <span class="v-color-gray">نام اشتراک:</span>
                                    <span class="mt-2">اشتراک همراهی</span>
                                </div>
                                <div class="d-flex justify-between mt-4">
                                    <div class="d-flex flex-column">
                                        <span class="v-color-gray">زمان شروع:</span>
                                        <span class="mt-2">1401/4/20 16:50</span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span class="v-color-gray">زمان اتمام:</span>
                                        <span class="mt-2">1401/4/20 16:50</span>
                                    </div>
                                </div>
                                <div class="v-color-base mt-3">مشاهده و تمدید اشتراک</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-column">
                                <span class="v-color-gray">زمان باقیمانده:</span>
                                <div class="d-flex align-center justify-between mt-1">
                                    <div>
                                        <img src="@/common/assets/images/user-chart-credit.svg" alt="...">
                                    </div>
                                    <div class="d-flex flex-column">
                                        <div class="d-flex flex-column">
                                            <img src="@/common/assets/images/color-credit.svg" width="17" alt="...">
                                            <span class="v-color-gray mt-1">باقیمانده</span>
                                        </div>
                                        <div class="d-flex flex-column mt-4">
                                            <img src="@/common/assets/images/none-credit.svg" width="17" alt="...">
                                            <span class="v-color-gray mt-1">مصرف شده</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCol>
        </BaseRow>
        <BaseRow class="mt-4">
            <BaseCol md="4">
                <div class="card">
                    <div class="card__header">
                        <div class="card__header--title">
                            <img src="@/common/assets/images/swap.svg" alt="...">
                            <span>قیمت لحظه ای</span>
                        </div>
                        <div class="v-color-gray">مشاهده همه</div>
                    </div>
                    <div class="card__body">
                        <div class="user-dashboard__prices-item" v-for="item in coinList">
                            <div class="d-flex align-center">
                                <img :src="item.image" style="width: 40px;height:40px;border-radius: 50%;" alt="...">
                                <div class="d-flex flex-column mr-2">
                                    <span>{{ item.name }}</span>
                                    <span class="text-uppercase v-color-gray v-fw-en-regular">{{ item.symbol }}</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="v-fw-en-regular">$2,509.75</span>
                                <span class="v-color-success text-end v-fw-en-regular">9.77%+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCol>
            <BaseCol md="8">
                <BaseRow>
                    <BaseCol>
                        <div class="card">
                            <div class="card__header">
                                <div class="card__header--title">
                                    <img src="@/common/assets/images/activity.svg" alt="...">
                                    <span>جدید ترین سیگنال ها</span>
                                </div>
                                <div class="v-color-gray">مشاهده همه</div>
                            </div>
                            <div class="card__body d-flex align-center justify-center">
                                <div class="user-dashboard__signals-item" v-for="item in 3">
                                    <div class="d-flex justify-between align-center mb-3">
                                        <div class="user-dashboard__signals-item--more">
                                            <img src="@/common/assets/images/more-circle.svg"
                                                @click="signalDetail = false" v-if="signalDetail" alt="...">
                                            <img src="@/common/assets/images/close-circle.svg"
                                                @click="signalDetail = true" v-else alt="...">
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="v-fw-en-regular text-uppercase">btcusdt</span>
                                            <span class="v-fw-en-regular">39,487.73</span>
                                        </div>
                                        <div class="user-dashboard__signals-item--img">
                                            <img src="@/common/assets/images/prices-usdt.svg" class="img__unit"
                                                alt="...">
                                            <img src="@/common/assets/images/prices-btc.svg" class="img__coin"
                                                alt="...">
                                        </div>
                                    </div>
                                    <template v-if="signalDetail">
                                        <div class="user-dashboard__signals-item--tp v-bg-modern-base">اسپات
                                            2022/07/18
                                            8:28
                                        </div>
                                        <div class="user-dashboard__signals-item--tp v-bg-modern-success">نقطه ورود:
                                            21.932
                                        </div>
                                        <div class="user-dashboard__signals-item--tp v-bg-modern-danger">حد ضرر: 21.932
                                        </div>
                                        <div class="user-dashboard__signals-item--tp v-bg-modern-gold">درصد ریسک: کم
                                            ریسک
                                        </div>
                                    </template>
                                    <template v-if="!signalDetail">
                                        <span class="v-color-gray">اهداف:</span>
                                        <template v-for="item in 3">
                                            <div class="user-dashboard__signals-item--tp-item">
                                                <span>هدف اول:</span>
                                                <span>15%</span>
                                                <span>$40,001</span>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </BaseCol>
                    <BaseCol class="mt-4" md="6">
                        <div class="card">
                            <div class="card__header">
                                <div class="card__header--title">
                                    <img src="@/common/assets/images/story.svg" alt="...">
                                    <span>نشست ها</span>
                                </div>
                            </div>
                            <div class="card__body">
                                <div class="d-flex align-center mb-4" v-for="item in userSystemList">
                                    <img src="@/common/assets/images/windows.svg" alt="...">
                                    <div class="ml-4 mr-4"><span class="v-color-gray ml-1">نوع دستگاه:</span>{{ item.os
                                            == 'Windows' ? 'ویندوز' : 'موبایل'
                                    }}
                                    </div>
                                    <div><span class="v-color-gray ml-1">زمان ورود:</span>{{
                                            georgianToJalali(item.createdAt)
                                    }}</div>
                                </div>
                            </div>
                        </div>
                    </BaseCol>
                    <BaseCol class="mt-4" md="6">
                        <div class="card h-100">
                            <div class="card__header">
                                <div class="card__header--title">
                                    <img src="@/common/assets/images/convert-card.svg" alt="...">
                                    <span>تراکنش ها</span>
                                </div>
                            </div>
                            <div class="card__body d-flex justify-center">
                                <img src="@/common/assets/images/no-data.svg" class="mt-5" alt="...">
                            </div>
                        </div>
                    </BaseCol>
                </BaseRow>
            </BaseCol>
        </BaseRow>
    </div>
</template>

<style lang="scss">
.user-dashboard {
    &__referral-img {
        background-color: #D6E4F0;
        border-radius: 25px;
        width: 100%;
        height: 100%;
        text-align: center;
        position: relative;

        img {
            margin-top: -15px;
        }

        span {
            width: 80%;
            position: absolute;
            top: 62%;
            right: 9%;
        }
    }

    &__prices-item {
        display: flex;
        background: #FFFFFF;
        border: 1px solid #D6E4F0;
        border-radius: 12.5px;
        padding: 13px 15px;
        margin: 15px 0;
        justify-content: space-between;
        cursor: pointer;
        transition: ease 200ms;

        &:hover {
            box-shadow: 0px 4px 16px 2px rgba(30, 86, 160, 0.08);
            border-color: transparent;
        }
    }

    &__signals-item {
        width: 202px;
        position: relative;
        border: 1px solid #D6E4F0;
        border-radius: 12.5px;
        padding: 15px;
        margin: 0 10px;
        cursor: pointer;
        transition: ease 200ms;

        &:hover {
            border-color: transparent;
            box-shadow: 0px 4px 16px 2px rgba(30, 86, 160, 0.08);
        }

        &--img {
            img {
                width: 27px;
                border: 2px solid #fff;
                border-radius: 50%;
            }

            .img__coin {
                position: absolute;
                z-index: 1;
                top: 31px;
                left: 26px;
                box-shadow: -6px -6px 10px rgba(0, 0, 0, 0.25);
            }

        }

        &--more {
            cursor: pointer;
        }

        &--tp {
            text-align: center;
            padding: 5px 0;
            margin-bottom: 5px;
            border-radius: 6px;
            font-size: 14px;
        }

        &--tp-item {
            padding: 5px 10px;
            margin-bottom: 5px;
            border-radius: 6px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #F6F6F6;
            color: #979797;

            &.tached {
                background: linear-gradient(180deg, #163172 0%, #1E56A0 100%);
                color: #fff;
            }
        }
    }
}
</style>