<script setup lang="ts">

</script>

<template>
    <div class="header">
        <div class="header__title">به کریپتو سیگنال بپیوندید</div>
        <div class="header__options">
            <div class="header__options--lang">
                <img src="@/common/assets/images/language.svg" alt="...">
            </div>
            <div class="header__options--notif">
                <img src="@/common/assets/images/notification.svg" alt="...">
            </div>
            <div class="header__options--mode">
                <img src="@/common/assets/images/light-mode.svg" alt="...">
            </div>
            <div class="header__options--profile">
                <img src="@/common/assets/images/profile.png" alt="...">
                <span>مهدی عزیز خوش آمدید</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    background: #FFFFFF;
    border-radius: 25px;
    height: 50px;
    position: absolute;
    top: 25px;
    left: 25px;
    right: 265px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    &__title {
        font-size: 16px;
        font-family: $fw-fa-base-bold;
        color: var(--base-color);
    }

    &__options {
        display: flex;
        align-items: center;

        &--profile {
            display: flex;
            align-items: center;
            margin: 0 12px;

            img {
                border-radius: 50%;
                width: 32px;
                height: 32px;
            }

            span {
                margin-right: 10px;
                font-size: 16px;
                color: var(--base-color);
            }
        }

        &--mode {
            margin: 0 12px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        &--notif {
            margin: 0 12px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        &--lang {
            margin: 0 12px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
}
</style>