<script lang="ts" setup></script>
<template>
  <!-- First Row -->
  <!-- Items in image -->
  <div class="custom-container">
    <div class="first-row row">
      <article class="article">
        <h2 class="article-title">
          با کریپتو سیگنال
          <br />پیشرو بازار های مالی باشید
        </h2>
        <p class="article-text">
          بستری سریع، امن و پربازده برای شما در بازار های مالی. بهترین سیگنال
          های خرید و فروش در دنیای پر چالش رمز ارز های دیجیتالی، با خیال راحت
          معامله کنید و از بازار لذت ببرید
        </p>
        <button class="blue-bg color-white article-button" type="button">
          همین الان شروع کنید
        </button>
      </article>
      <div class="image-field">
        <img
          class="image-field__img"
          src="@/assets/media/landing/first-row/person.png"
        />
      </div>
    </div>
  </div>
  <!-- Second Row -->
  <div class="custom-container">
    <div class="second-row row">
      <section class="signal-features__item">
        <figure class="img-box">
          <img class="" src="@/assets/media/landing/second-row/health.svg" />
          <figcaption class="caption">سیگنال رایگان</figcaption>
        </figure>
      </section>
      <section class="signal-features__item">
        <figure class="img-box">
          <img class="" src="@/assets/media/landing/second-row/note-2.svg" />
          <figcaption class="caption">آموزش بازار</figcaption>
        </figure>
      </section>
      <section class="signal-features__item">
        <figure class="img-box">
          <img class="" src="@/assets/media/landing/second-row/status-up.svg" />
          <figcaption class="caption">قیمت لحظه ای</figcaption>
        </figure>
      </section>
      <section class="signal-features__item">
        <figure class="img-box">
          <img
            class=""
            src="@/assets/media/landing/second-row/24-support.svg"
          />
          <figcaption class="caption">پشتیبانی 24 ساعته</figcaption>
        </figure>
      </section>
    </div>
  </div>
  <!-- Third Row -->
  <div class="custom-container">
    <div class="third-row row">
      <article class="article">
        <h2 class="article-title">
          با خیال راحت معاملات خود را به کریپتو سیگنال بسپارید
        </h2>
        <p class="article-text">
          بهترین پلتفرم در دنیای رمز ارز های دیجیتالی با قابلیت متنوع در کریپتو
          سیگنال.
        </p>
        <div class="button-holder">
          <img
            class="button-holder__border"
            src="@/assets/media/landing/third-row/button.png"
          />
          <button type="button" class="article-button">
            به کریپتو سیگنال بپیوندید
          </button>
        </div>
      </article>
      <section class="box-holder">
        <article
          class="box-holder__item"
          v-for="(items, index) in joinUs"
          :key="index"
          :class="[items.isActive ? 'active' : '']"
          @mouseenter="items.isActive = true"
          @mouseleave="items.isActive = false"
        >
          <section class="box-holder__item-header">
            <div class="box-holder__item-header__icon" v-html="items.svg"></div>
            <h3 class="box-holder__item-header__title">{{ items.header }}</h3>
          </section>
          <p class="box-holder__item__content">
            {{ items.content }}
          </p>
        </article>
      </section>
    </div>
  </div>
  <!-- Fourth Row -->
  <div class="custom-container p-0">
    <!-- Header Box -->
    <div class="header-group">
      <h3 class="article-title">با سیگنال های رایگان معامله کنید</h3>
      <p class="article-text">
        با سیگنال های رایگان کریپتو سیگنال از همین لحظه وارد معامله در دنیای رمز
        ارز ها شوید
      </p>
    </div>
    <!-- Main content -->
    <div class="custom-container fourth">
      <div class="fourth-row row">
        <div class="signal-box">
          <div class="signal-box__header">
            <div class="signal-box__header-details">
              <div class="token-price">
                <span class="token-price__name">BTTUSDT</span>
                <span class="token-price__value">22.994 USDT</span>
              </div>
              <div class="signal-start">
                <span class="signal-start__text">شروع در :</span>
                <span class="signal-start__time">17:55</span>
                <span class="signal-start__date">2021/11/5</span>
              </div>
            </div>

            <div class="signal-box__header-token">
              <img
                class="token-logo"
                src="@/assets/media/landing/fourth-row/btt.png"
              />
              <img
                class="transfer-logo"
                src="@/assets/media/landing/fourth-row/tether.png"
              />
            </div>
          </div>
          <div class="signal-box__body">
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نوع معامله :</h6>
              <p class="signal-box__body-detail__description">اسپات</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">وضعیت معامله :</h6>
              <p class="signal-box__body-detail__description sale">خرید</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">درصد ریسک :</h6>
              <p class="signal-box__body-detail__description">20%</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نقطه ورود :</h6>
              <p class="signal-box__body-detail__description">23,010</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">حد ضرر :</h6>
              <p class="signal-box__body-detail__description">22,999</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">هدف اول :</h6>
              <p class="signal-box__body-detail__description">23,101</p>
            </div>
          </div>
        </div>
        <div class="signal-box">
          <div class="signal-box__header">
            <div class="signal-box__header-details">
              <div class="token-price">
                <span class="token-price__name">BTTUSDT</span>
                <span class="token-price__value">22.994 USDT</span>
              </div>
              <div class="signal-start">
                <span class="signal-start__text">شروع در :</span>
                <span class="signal-start__time">17:55</span>
                <span class="signal-start__date">2021/11/5</span>
              </div>
            </div>

            <div class="signal-box__header-token">
              <img
                class="token-logo"
                src="@/assets/media/landing/fourth-row/btt.png"
              />
              <img
                class="transfer-logo"
                src="@/assets/media/landing/fourth-row/tether.png"
              />
            </div>
          </div>
          <div class="signal-box__body">
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نوع معامله :</h6>
              <p class="signal-box__body-detail__description">اسپات</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">وضعیت معامله :</h6>
              <p class="signal-box__body-detail__description sale">خرید</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">درصد ریسک :</h6>
              <p class="signal-box__body-detail__description">20%</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نقطه ورود :</h6>
              <p class="signal-box__body-detail__description">23,010</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">حد ضرر :</h6>
              <p class="signal-box__body-detail__description">22,999</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">هدف اول :</h6>
              <p class="signal-box__body-detail__description">23,101</p>
            </div>
          </div>
        </div>
        <div class="signal-box">
          <div class="signal-box__header">
            <div class="signal-box__header-details">
              <div class="token-price">
                <span class="token-price__name">BTTUSDT</span>
                <span class="token-price__value">22.994 USDT</span>
              </div>
              <div class="signal-start">
                <span class="signal-start__text">شروع در :</span>
                <span class="signal-start__time">17:55</span>
                <span class="signal-start__date">2021/11/5</span>
              </div>
            </div>

            <div class="signal-box__header-token">
              <img
                class="token-logo"
                src="@/assets/media/landing/fourth-row/btt.png"
              />
              <img
                class="transfer-logo"
                src="@/assets/media/landing/fourth-row/tether.png"
              />
            </div>
          </div>
          <div class="signal-box__body">
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نوع معامله :</h6>
              <p class="signal-box__body-detail__description">اسپات</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">وضعیت معامله :</h6>
              <p class="signal-box__body-detail__description buy">فروش</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">درصد ریسک :</h6>
              <p class="signal-box__body-detail__description">20%</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نقطه ورود :</h6>
              <p class="signal-box__body-detail__description">23,010</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">حد ضرر :</h6>
              <p class="signal-box__body-detail__description">22,999</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">هدف اول :</h6>
              <p class="signal-box__body-detail__description">23,101</p>
            </div>
          </div>
        </div>
        <div class="signal-box">
          <div class="signal-box__header">
            <div class="signal-box__header-details">
              <div class="token-price">
                <span class="token-price__name">BTTUSDT</span>
                <span class="token-price__value">22.994 USDT</span>
              </div>
              <div class="signal-start">
                <span class="signal-start__text">شروع در :</span>
                <span class="signal-start__time">17:55</span>
                <span class="signal-start__date">2021/11/5</span>
              </div>
            </div>

            <div class="signal-box__header-token">
              <img
                class="token-logo"
                src="@/assets/media/landing/fourth-row/btt.png"
              />
              <img
                class="transfer-logo"
                src="@/assets/media/landing/fourth-row/tether.png"
              />
            </div>
          </div>
          <div class="signal-box__body">
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نوع معامله :</h6>
              <p class="signal-box__body-detail__description">اسپات</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">وضعیت معامله :</h6>
              <p class="signal-box__body-detail__description sale">خرید</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">درصد ریسک :</h6>
              <p class="signal-box__body-detail__description">20%</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">نقطه ورود :</h6>
              <p class="signal-box__body-detail__description">23,010</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">حد ضرر :</h6>
              <p class="signal-box__body-detail__description">22,999</p>
            </div>
            <div class="signal-box__body-detail">
              <h6 class="signal-box__body-detail__title">هدف اول :</h6>
              <p class="signal-box__body-detail__description">23,101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Fifth Row -->
  <div class="custom-container fifth">
    <div class="fifth-row row">
      <section class="timeline-field">
        <section class="timeline-field__item">
          <img
            class="timeline-field__item-img"
            src="@/assets/media/landing/fifth-row/timeline1.png"
          />
          <p class="timeline-field__item-description">
            مراحل ثبت نام را <br />
            انجام دهید وارد شوید
          </p>
          <div class="timeline-bullet left-position"></div>
        </section>
        <section class="timeline-field__item">
          <img
            class="timeline-field__item-img"
            src="@/assets/media/landing/fifth-row/timeline2.png"
          />
          <p class="timeline-field__item-description">
            از سیگنال های <br />
            رایگان استفاده کنید
          </p>
          <div class="timeline-bullet left-position"></div>
        </section>
        <section class="timeline-field__item">
          <img
            class="timeline-field__item-img"
            src="@/assets/media/landing/fifth-row/timeline3.png"
          />
          <p class="timeline-field__item-description">
            از معاملات کم ریسک و<br />
            پر سودخود لذت ببرید
          </p>
          <div class="timeline-bullet right-position"></div>
        </section>
        <section class="timeline-field__item">
          <img
            class="timeline-field__item-img"
            src="@/assets/media/landing/fifth-row/timeline4.png"
          />
          <p class="timeline-field__item-description">
            برای سیگنال های بیشتر و پر<br />
            سود تر اشتراک بخرید
          </p>
        </section>
        <div class="timeline-line"></div>
        <div class="timeline-line"></div>
        <div class="timeline-line"></div>
        <div class="timeline-line"></div>
        <div class="timeline-line"></div>
      </section>
      <article class="article">
        <h2 class="article-title">
          راه معامله گر شدن در کریپتو سیگنال را دنبال کنید
        </h2>
        <p class="article-text">
          با ما همراه شوید و مسیر معاملات پر سود را در کریپو سیگنال دنبال کنید
        </p>
      </article>
    </div>
  </div>
  <div class="custom-container p-0 sixth-bg">
    <!-- Header Box -->
    <div class="header-group">
      <h3 class="article-title">یک انتخاب سودمند</h3>
      <p class="article-text p-l-4 p-r-4">
        با انتخاب یکی از اشتراک ها و خریداری آن به سیگنال های اختصاصی دسترسی
        دارید و معاملاتی با سود بیشتر در کریپتو سیگنال داشته باشید
      </p>
    </div>
    <!-- Main content -->
    <div class="custom-container sixth">
      <div class="subscription-box">
        <div class="subscription-box__header">1 روزه</div>
        <div class="subscription-box__title">
          <img
            class="subscription-box__title-img"
            src="@/assets/media/landing/sixth-row/trust.svg"
          />
          <div class="subscription-box__title-text">
            <p class="header">اشتراک اطمینان</p>
            <p class="sub-header">Trust subscription</p>
          </div>
          <div class="subscription-box__title-price">
            <p class="header">رایگان</p>
            <p class="sub-header">free</p>
          </div>
        </div>
        <div class="subscription-box__body">
          <div
            class="subscription-box__body-item"
            v-for="item in 6"
            :key="item"
          >
            <img
              class="verify-img"
              src="@/assets/media/landing/sixth-row/verify.svg"
            />
            <p class="content">لورم ایپسوم متن ساختگی با تولید سادگی</p>
          </div>
        </div>
        <button class="subscription-box__button blue-bg">انتخاب اشتراک</button>
      </div>
      <div class="subscription-box">
        <div class="subscription-box__header">30 روزه</div>
        <div class="subscription-box__title">
          <img
            class="subscription-box__title-img"
            src="@/assets/media/landing/sixth-row/accompany.svg"
          />
          <div class="subscription-box__title-text">
            <p class="header">اشتراک همراهی</p>
            <p class="sub-header">Accompany subscription</p>
          </div>
          <div class="subscription-box__title-price">
            <p class="header">20تتر</p>
            <p class="sub-header">20USDT</p>
          </div>
        </div>
        <div class="subscription-box__body">
          <div
            class="subscription-box__body-item"
            v-for="item in 6"
            :key="item"
          >
            <img
              class="verify-img"
              src="@/assets/media/landing/sixth-row/verify.svg"
            />
            <p class="content">لورم ایپسوم متن ساختگی با تولید سادگی</p>
          </div>
        </div>
        <button class="subscription-box__button blue-bg">انتخاب اشتراک</button>
      </div>
      <div class="subscription-box">
        <div class="subscription-box__header">90روزه</div>
        <div class="subscription-box__title">
          <img
            class="subscription-box__title-img"
            src="@/assets/media/landing/sixth-row/progress.svg"
          />
          <div class="subscription-box__title-text">
            <p class="header">اشتراک پیشرفت</p>
            <p class="sub-header">Progress subscription</p>
          </div>
          <div class="subscription-box__title-price">
            <p class="header">40تتر</p>
            <p class="sub-header">40USDT</p>
          </div>
        </div>
        <div class="subscription-box__body">
          <div
            class="subscription-box__body-item"
            v-for="item in 6"
            :key="item"
          >
            <img
              class="verify-img"
              src="@/assets/media/landing/sixth-row/verify.svg"
            />
            <p class="content">لورم ایپسوم متن ساختگی با تولید سادگی</p>
          </div>
        </div>
        <button class="subscription-box__button blue-bg">انتخاب اشتراک</button>
      </div>
    </div>
  </div>
  <!-- Seventh Row -->
  <div class="custom-container">
    <div class="seventh-row row">
      <article class="article">
        <h2 class="article-title">
          آموزش، جدید ترین اخبار و مقالات در کریپتو سیگنال
        </h2>
        <p class="article-text">
          آموزش های به روز در بازار های مالی جدید ترین اخبار دنیای رمز ارز ها و
          تمام ریز و درشت دنیای رمز ارز ها در اخبار مقالات کریپتو سیگنال به صورت
          کامل و دسته بندی شده در اختیار شماست.
        </p>
      </article>
      <section class="news-card">
        <section
          class="news-card__item"
          v-for="(items, index) in newsCard"
          :key="index"
        >
          <figure class="news-card__image">
            <img class="" :src="items.img.src" />
            <figcaption class="news-card__image-caption">
              {{ items.img.title }}
            </figcaption>
          </figure>
          <article class="news-card__article">
            <h4 class="news-card__article-title">{{ items.article.header }}</h4>
            <p class="news-card__article-description">
              {{ items.article.description }}
            </p>
          </article>
          <section class="news-card__data">
            <div class="news-card__data-item author">
              {{ items.articleData.author }}
            </div>
            <div class="news-card__data-item date">
              {{ items.articleData.date }}
            </div>
            <div class="news-card__data-item time">
              {{ items.articleData.time }}
            </div>
          </section>
        </section>
      </section>
    </div>
  </div>
  <!-- Eighth Row -->
  <div class="custom-container eighth">
    <div class="eighth-row row">
      <div class="row-holder">
        <h4 class="header">
          برای آگاهی از جدید ترین اخبار کریپتو سیگنال ایمیل خود را وارد کنید
        </h4>
        <div class="input-box">
          <input class="input-field" type="text" placeholder="@gmail.com" />
          <button class="input-submit" type="button">ثبت ایمیل</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  data: () => ({
    headerNav: [],
    newsCard: [
      {
        img: {
          src: "_nuxt/assets/media/landing/seventh-row/news1.png",
          title: "اخبار",
        },
        article: {
          header:
            "رشد ۶۰ درصدی قیمت پالیگان طی ۴ روز؛ انباشت ادامه‌دار توکن متیک",
          description: ` الگوی سروشانه معکوس در نمودار قیمت متیک (MATIC)، توکن شبکه
              پالیگان، احتمال جهش ۲۰ درصدی قیمت این ارز دیجیتال را تقویت می‌کند.
              طی هفته جاری علاوه بر اینکه روند نزولی پالیگان بالاخره متوقف شد،
              قیمت این ارز دیجیتال نیز به شدت افزایش یافت.`,
        },
        articleData: {
          author: "مهدی طالبی",
          date: "دیروز",
          time: "۱۲ دقیقه",
        },
      },
      {
        img: {
          src: "_nuxt/assets/media/landing/seventh-row/news2.png",
          title: "اخبار",
        },
        article: {
          header:
            "رشد ۶۰ درصدی قیمت پالیگان طی ۴ روز؛ انباشت ادامه‌دار توکن متیک",
          description: ` الگوی سروشانه معکوس در نمودار قیمت متیک (MATIC)، توکن شبکه
              پالیگان، احتمال جهش ۲۰ درصدی قیمت این ارز دیجیتال را تقویت می‌کند.
              طی هفته جاری علاوه بر اینکه روند نزولی پالیگان بالاخره متوقف شد،
              قیمت این ارز دیجیتال نیز به شدت افزایش یافت.`,
        },
        articleData: {
          author: "مهدی طالبی",
          date: "دیروز",
          time: "۱۲ دقیقه",
        },
      },
    ],
    joinUs: [
      {
        svg: `<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M41.3757 22.8274C41.1572 22.5791 40.8497 22.4269 40.5198 22.4039C40.1899 22.3808 39.8642 22.4887 39.6133 22.7042L38.795 23.4155L38.8543 22.5676C39.0959 19.1202 38.2609 15.6829 36.4646 12.7305C34.6683 9.77823 31.9994 7.45665 28.8268 6.08661C25.6541 4.71657 22.1342 4.3657 18.7535 5.08247C15.3728 5.79924 12.2982 7.54828 9.95446 10.0879C9.84291 10.2085 9.7562 10.3498 9.69927 10.5039C9.64235 10.6579 9.61632 10.8217 9.62269 10.9858C9.62905 11.1499 9.66768 11.3112 9.73637 11.4604C9.80505 11.6096 9.90245 11.7438 10.023 11.8553C10.1436 11.9669 10.2849 12.0536 10.439 12.1105C10.593 12.1674 10.7568 12.1935 10.9209 12.1871C11.085 12.1807 11.2463 12.1421 11.3955 12.0734C11.5447 12.0047 11.6789 11.9073 11.7904 11.7868C13.7827 9.62755 16.3963 8.14035 19.2703 7.53066C22.1443 6.92098 25.1366 7.21891 27.8339 8.3833C30.5313 9.54768 32.8004 11.521 34.3278 14.0307C35.8552 16.5404 36.5654 19.4625 36.3604 22.3932L36.3023 23.2245L35.591 22.4062C35.4854 22.2757 35.3546 22.1678 35.2064 22.089C35.0582 22.0101 34.8956 21.962 34.7284 21.9473C34.5612 21.9326 34.3927 21.9518 34.2331 22.0037C34.0734 22.0555 33.9258 22.139 33.7992 22.2491C33.6725 22.3593 33.5693 22.4938 33.4957 22.6447C33.4221 22.7955 33.3797 22.9597 33.3709 23.1273C33.3622 23.295 33.3873 23.4626 33.4447 23.6204C33.5022 23.7781 33.5908 23.9226 33.7054 24.0454L36.396 27.1406C36.5033 27.2615 36.6324 27.3612 36.7764 27.4345C36.9238 27.5116 37.0857 27.557 37.2516 27.568C37.4174 27.5786 37.5837 27.5561 37.7407 27.5019C37.8936 27.4494 38.0353 27.3686 38.1584 27.2638L41.2536 24.5732C41.3763 24.4666 41.4768 24.3369 41.5494 24.1915C41.622 24.0461 41.6652 23.8877 41.6765 23.7256C41.6878 23.5635 41.6671 23.4007 41.6155 23.2466C41.5639 23.0925 41.4824 22.95 41.3757 22.8274Z" fill="currentColor"/>
              <path d="M34.3941 30.9437C34.2745 30.8313 34.1335 30.744 33.9796 30.6869C33.8257 30.6299 33.6619 30.6042 33.498 30.6114C33.334 30.6186 33.1731 30.6586 33.0248 30.7289C32.8765 30.7993 32.7437 30.8986 32.6344 31.0211C31.196 32.5863 29.4229 33.8067 27.4472 34.5914C25.4715 35.376 23.3442 35.7047 21.2239 35.5528C17.4735 35.2849 13.9824 33.5409 11.5157 30.7033C9.04898 27.8657 7.80789 24.1658 8.06445 20.4147L8.12258 19.5834L8.8339 20.4017C8.941 20.5261 9.07181 20.628 9.21871 20.7014C9.36561 20.7748 9.52566 20.8182 9.6895 20.8291C9.8522 20.8393 10.0153 20.816 10.1686 20.7606C10.3219 20.7052 10.4622 20.619 10.5808 20.5071C10.8291 20.2887 10.9813 19.9811 11.0044 19.6512C11.0274 19.3213 10.9195 18.9956 10.704 18.7447L8.02836 15.6506C7.91039 15.5342 7.77675 15.4349 7.63131 15.3555C7.48659 15.2793 7.3276 15.234 7.16444 15.2226C7.00128 15.2112 6.83753 15.2339 6.68362 15.2892C6.53364 15.348 6.39296 15.4282 6.26599 15.5273L3.17243 18.2181C3.04193 18.3237 2.93404 18.4545 2.85519 18.6027C2.77634 18.7509 2.72815 18.9134 2.71349 19.0806C2.69883 19.2479 2.718 19.4163 2.76985 19.576C2.82171 19.7356 2.90519 19.8832 3.01532 20.0099C3.12545 20.1366 3.25997 20.2398 3.41085 20.3134C3.56173 20.3869 3.72589 20.4294 3.89353 20.4381C4.06116 20.4469 4.22884 20.4218 4.38657 20.3643C4.54429 20.3068 4.68883 20.2182 4.81155 20.1037L5.62983 19.3924L5.57054 20.2403C5.26683 24.6531 6.726 29.0061 9.62788 32.3443C12.5298 35.6826 16.6374 37.7334 21.0495 38.0468C23.5431 38.225 26.0447 37.8386 28.3684 36.9163C30.692 35.9941 32.7777 34.5597 34.4704 32.72C34.5827 32.5987 34.6699 32.4563 34.7269 32.3012C34.7839 32.146 34.8095 31.9811 34.8025 31.8159C34.7954 31.6508 34.7556 31.4887 34.6855 31.3389C34.6155 31.1892 34.5164 31.0549 34.3941 30.9437Z" fill="currentColor"/>
              <path d="M27.9896 21.2064C28.4981 20.5564 28.7979 19.7678 28.8495 18.9442C28.8974 17.8488 28.5231 16.7769 27.8038 15.9494C27.0844 15.1219 26.075 14.602 24.9837 14.497L23.6203 14.4017L23.7366 12.7391C23.7597 12.4084 23.6505 12.082 23.433 11.8318C23.2155 11.5816 22.9075 11.428 22.5768 11.4049C22.2461 11.3818 21.9197 11.491 21.6695 11.7085C21.4193 11.926 21.2658 12.234 21.2427 12.5647L21.1264 14.2273L17.7181 13.9889C17.3879 13.968 17.0627 14.078 16.813 14.2951C16.5633 14.5121 16.4092 14.8188 16.3839 15.1487L15.5701 26.787C15.5492 27.1171 15.6592 27.4423 15.8762 27.692C16.0933 27.9417 16.4 28.0958 16.7298 28.1211L20.1382 28.3594L20.0219 30.022C19.9988 30.3528 20.108 30.6791 20.3255 30.9293C20.543 31.1795 20.851 31.3331 21.1817 31.3562C21.5124 31.3793 21.8388 31.2701 22.089 31.0526C22.3392 30.8351 22.4927 30.5271 22.5158 30.1964L22.6321 28.5338L25.0429 28.7024C26.196 28.8357 27.355 28.5069 28.2663 27.7879C29.1777 27.0688 29.7671 26.0181 29.9057 24.8656C29.9417 24.1402 29.783 23.4184 29.4461 22.775C29.1092 22.1316 28.6063 21.59 27.9896 21.2064ZM18.7906 16.5701L24.8093 16.9909C25.2387 17.0499 25.6322 17.2628 25.9165 17.5899C26.2009 17.9171 26.3569 18.3363 26.3556 18.7698C26.3248 19.2107 26.12 19.6214 25.7864 19.9114C25.4528 20.2014 25.0177 20.347 24.5767 20.3161L18.5581 19.8953L18.7906 16.5701ZM25.2173 26.2085L18.1512 25.7144L18.3837 22.3892L25.4498 22.8833C25.9478 22.8699 26.4315 23.0513 26.7979 23.3889C27.1643 23.7265 27.3845 24.1937 27.4118 24.6912C27.3156 25.1801 27.0324 25.6121 26.6226 25.8954C26.2128 26.1788 25.7086 26.2911 25.2173 26.2085Z" fill="currentColor"/>
              <defs>
              <linearGradient id="paint0_linear_55_307" x1="26.5113" y1="4.97952" x2="24.9917" y2="26.7107" gradientUnits="userSpaceOnUse">
              <stop stop-color="#163172"/>
              <stop offset="1" stop-color="#1E56A0"/>
              </linearGradient>
              <linearGradient id="paint1_linear_55_307" x1="19.417" y1="16.0794" x2="17.8963" y2="37.8263" gradientUnits="userSpaceOnUse">
              <stop stop-color="#163172"/>
              <stop offset="1" stop-color="#1E56A0"/>
              </linearGradient>
              <linearGradient id="paint2_linear_55_307" x1="23.7406" y1="11.4863" x2="22.3455" y2="31.4376" gradientUnits="userSpaceOnUse">
              <stop stop-color="#163172"/>
              <stop offset="1" stop-color="#1E56A0"/>
              </linearGradient>
              </defs>
              </svg>
              `,
        header: "بروز ترین پلتفرم",
        content: `پشتیبانی از تمامی مارکت ها، جدید ترین اخبار
                  و مقالات روز دنیای رمز ارز ها و قیمت لحظه ای
                  تمام رمز ارز ها در سیگنال کریپتو تمامی`,
        isActive: true,
      },
      {
        svg: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.7281 19.9137C8.83884 19.9715 8.96266 20.0009 9.08649 20C9.21032 19.999 9.33314 19.9686 9.44489 19.9097L13.0128 18.0025C14.0245 17.4631 14.8168 16.8601 15.435 16.1579C16.779 14.6282 17.5129 12.6758 17.4998 10.6626L17.4575 4.02198C17.4535 3.25711 16.9511 2.57461 16.2082 2.32652L9.57073 0.0995642C9.17106 -0.0357592 8.73313 -0.0328174 8.3405 0.106428L1.72824 2.41281C0.989299 2.67071 0.495998 3.35811 0.500024 4.12397L0.542307 10.7597C0.555395 12.7758 1.31448 14.7194 2.68062 16.2335C3.3048 16.9258 4.10415 17.52 5.12699 18.0505L8.7281 19.9137ZM7.78357 12.1089C7.93257 12.2521 8.12586 12.3227 8.31916 12.3207C8.51245 12.3198 8.70474 12.2472 8.85172 12.1021L12.7508 8.2581C13.0438 7.96882 13.0408 7.50401 12.7448 7.21866C12.4478 6.9333 11.9696 6.93526 11.6766 7.22454L8.30808 10.5449L6.92885 9.21909C6.63186 8.93373 6.15467 8.93667 5.8607 9.22595C5.56774 9.51523 5.57076 9.98004 5.86775 10.2654L7.78357 12.1089Z" fill="currentColor"/>
              </svg>
              `,
        header: "امن و قابل اطمینان",
        content: `بدون نگرانی بابت اطلاعات شما در بستری امن و قابل اطمینان معامله کنید و نگرانی برای افشا اطلاعات خود در بستر کریپتو سیگنال نباشید`,
        isActive: false,
      },
      {
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9099 10.7199H14.8239V3.5199C14.8239 1.8399 13.9139 1.4999 12.8039 2.7599L12.0039 3.6699L5.23392 11.3699C4.30392 12.4199 4.69392 13.2799 6.09392 13.2799H9.18392V20.4799C9.18392 22.1599 10.0939 22.4999 11.2039 21.2399L12.0039 20.3299L18.7739 12.6299C19.6999 11.5799 19.3099 10.7199 17.9099 10.7199Z" fill="currentColor"/>
              </svg>`,
        header: "سریع و قدرتمند",
        content: `سریع ترین سیستم انتقال اطلاعات در کریپتو سیگنال.
                  در سریع ترین زمان ممکن سیگنال های جدید را مشاهده
                  کنید و در بازار پیشی بگیرید.`,
        isActive: false,
      },
      {
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.00001 15C3.93914 15 2.92173 15.4214 2.17158 16.1716C1.42143 16.9217 1.00001 17.9391 1.00001 19C0.998583 19.7272 1.1994 20.4404 1.58001 21.06C1.93254 21.6525 2.43329 22.143 3.03297 22.4831C3.63265 22.8233 4.31057 23.0014 5.00001 23C5.97048 23.0051 6.90806 22.6486 7.63001 22C7.94533 21.7343 8.21256 21.4163 8.42001 21.06C8.80062 20.4404 9.00143 19.7272 9.00001 19C9.00001 17.9391 8.57858 16.9217 7.82843 16.1716C7.07829 15.4214 6.06087 15 5.00001 15V15ZM7.07001 18.57L4.94001 20.54C4.80063 20.6675 4.6189 20.7388 4.43001 20.74C4.33148 20.7404 4.23388 20.7211 4.14288 20.6833C4.05188 20.6455 3.96932 20.59 3.90001 20.52L2.91001 19.53C2.77753 19.3878 2.7054 19.1998 2.70883 19.0055C2.71226 18.8112 2.79097 18.6258 2.92839 18.4884C3.0658 18.351 3.25118 18.2723 3.44549 18.2688C3.63979 18.2654 3.82783 18.3375 3.97001 18.47L4.45001 18.95L6.05001 17.47C6.19588 17.3347 6.3895 17.263 6.58829 17.2705C6.78708 17.278 6.97475 17.3641 7.11001 17.51C7.24527 17.6559 7.31704 17.8495 7.30954 18.0483C7.30204 18.2471 7.21588 18.4347 7.07001 18.57Z" fill="currentColor"/>
              <path d="M14.85 3.9498V7.7498H13.35V3.9498C13.3499 3.88437 13.3337 3.81997 13.3029 3.76225C13.2721 3.70453 13.2276 3.65525 13.1733 3.61873C13.119 3.5822 13.0566 3.55956 12.9915 3.55277C12.9264 3.54599 12.8607 3.55527 12.8 3.5798L4.87001 6.5698C4.61229 6.66677 4.3906 6.84061 4.23498 7.06778C4.07937 7.29495 3.99734 7.56446 4.00001 7.8398V8.5098C3.53346 8.85835 3.15486 9.31113 2.89442 9.83201C2.63398 10.3529 2.49892 10.9274 2.50001 11.5098V7.8398C2.49872 7.26043 2.67416 6.69444 3.00292 6.21738C3.33169 5.74031 3.79813 5.37486 4.34001 5.1698L12.28 2.1698C12.4947 2.09133 12.7214 2.05073 12.95 2.0498C13.4535 2.05112 13.936 2.25173 14.2921 2.60776C14.6481 2.96379 14.8487 3.4463 14.85 3.9498Z" fill="currentColor"/>
              <path d="M21.4949 14.5002V15.5002C21.495 15.6311 21.4436 15.7568 21.352 15.8503C21.2604 15.9438 21.1358 15.9976 21.0049 16.0002H19.5499C19.2924 16.0071 19.0415 15.9176 18.8464 15.7493C18.6513 15.581 18.526 15.346 18.4949 15.0902C18.4815 14.9438 18.5005 14.7961 18.5506 14.6578C18.6007 14.5196 18.6807 14.394 18.7849 14.2902C18.8761 14.1959 18.9858 14.1214 19.1071 14.0715C19.2284 14.0216 19.3588 13.9973 19.4899 14.0002H20.9949C21.1275 14.0002 21.2547 14.0529 21.3485 14.1467C21.4422 14.2404 21.4949 14.3676 21.4949 14.5002Z" fill="currentColor"/>
              <path d="M19.48 12.95H20.5C20.7652 12.95 21.0196 12.8447 21.2071 12.6571C21.3946 12.4696 21.5 12.2152 21.5 11.95V11.51C21.4979 10.5135 21.1011 9.55831 20.3964 8.85363C19.6917 8.14895 18.7366 7.75213 17.74 7.75002H6.26001C5.44352 7.74748 4.64905 8.01465 4.00001 8.51002C3.53346 8.85856 3.15486 9.31134 2.89442 9.83222C2.63398 10.3531 2.49891 10.9277 2.50001 11.51V13.29C2.50428 13.3786 2.52942 13.4649 2.57337 13.5419C2.61732 13.6189 2.67884 13.6845 2.75292 13.7332C2.82699 13.7819 2.91154 13.8125 2.99965 13.8224C3.08777 13.8322 3.17698 13.8211 3.26001 13.79C3.82032 13.5991 4.40808 13.5012 5.00001 13.5C6.45789 13.5027 7.8553 14.083 8.88617 15.1139C9.91705 16.1447 10.4974 17.5421 10.5 19C10.4834 19.7617 10.3169 20.5127 10.01 21.21C9.97171 21.2929 9.95438 21.384 9.95955 21.4751C9.96472 21.5663 9.99222 21.6548 10.0396 21.7328C10.0871 21.8109 10.1529 21.8761 10.2315 21.9227C10.31 21.9692 10.3988 21.9958 10.49 22H17.74C18.7366 21.9979 19.6917 21.6011 20.3964 20.8964C21.1011 20.1917 21.4979 19.2366 21.5 18.24V18.05C21.5 17.7848 21.3946 17.5304 21.2071 17.3429C21.0196 17.1554 20.7652 17.05 20.5 17.05H19.63C19.158 17.0628 18.6946 16.9213 18.3103 16.647C17.9259 16.3727 17.6414 15.9806 17.5 15.53C17.4042 15.1819 17.4037 14.8144 17.4987 14.466C17.5937 14.1177 17.7807 13.8013 18.04 13.55C18.2273 13.3583 18.4514 13.2064 18.6989 13.1033C18.9463 13.0002 19.212 12.9481 19.48 12.95ZM14 12.75H9.00001C8.80109 12.75 8.61033 12.671 8.46968 12.5303C8.32902 12.3897 8.25001 12.1989 8.25001 12C8.25001 11.8011 8.32902 11.6103 8.46968 11.4697C8.61033 11.329 8.80109 11.25 9.00001 11.25H14C14.1989 11.25 14.3897 11.329 14.5303 11.4697C14.671 11.6103 14.75 11.8011 14.75 12C14.75 12.1989 14.671 12.3897 14.5303 12.5303C14.3897 12.671 14.1989 12.75 14 12.75Z" fill="currentColor"/>
              </svg>`,
        header: "سودمند و پربازده",
        content: `سیگنال های پرسود و کم ریسک، بهترین و راحت ترین راه
                  برای معامله در بازارهای مالی است.
                  با کریپتو سیگنال به راحتی سود کنید و با خیال راحت
                  به معاملات میپردازید`,
        isActive: false,
      },
    ],
  }),
});
</script>

<style lang="scss" scoped>
// ****************************************************************
// Global CSS Classes
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 88px;
}
.article {
  flex: 1 1 0;
  max-width: 33.333%;
}

.article-title {
  color: var(--color-base);
  font-size: var(--fs-xxl);
  font-family: var(--bakh-en-fat);
  line-height: normal;
  font-weight: bolder;
  margin-bottom: 3rem;
}

.article-text {
  color: var(--color-black);
  font-family: var(--bakh-fa-regular);
  font-size: var(--fs-xl);
  font-weight: 400;
  line-height: normal;
  margin-bottom: 3rem;
  width: 90%;
  word-spacing: 0.5rem;
}

.button-holder {
  position: relative;
  width: max-content;
  height: max-content;
  .article-button {
    color: var(--color-base);
    font-size: var(--fs-md);
    font-family: var(--bakh-fa-regular);
    font-weight: 400;
    line-height: normal;
    position: absolute;
    width: max-content;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.article-button {
  font-size: var(--fs-sm);
  color: var(--color-base);
  font-family: var(--bakh-fa-regular);
  padding: 15px 25px;
  border-radius: 10px;
}
div[class$="-row"] {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.p-0 {
  padding: 0px !important;
}
.p-l-4 {
  padding-left: 4rem !important;
}
.p-r-4 {
  padding-right: 4rem !important;
}
// ****************************************************************
// DOM elements CSS classes
.first-row {
  .article {
    .article-text {
      width: 100% !important;
    }
  }
  .image-field {
    flex: 1 1 0;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
  }
}
.second-row {
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 6rem;
  .signal-features__item {
    $size: 180px;
    width: $size;
    height: $size;
    background: #d6e4f0;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 30px 20px;
    .img-box {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1 1 0;
      height: 100%;
      img {
        margin-bottom: 0.5rem;
      }
      .caption {
        font-size: var(--fs-md);
        font-family: var(--bakh-fa-regular);
        line-height: normal;
        color: #163172;
      }
    }
  }
}
.third-row {
  .box-holder {
    flex: 1 1 0;
    gap: 25px;

    .box-holder__item {
      width: 340px;
      height: 250px;
      width: calc(50% - 50px);
      margin: 12.5px;
      background: #f6f6f6;
      border: 1px solid #d6e4f0;
      border-radius: 15px;
      display: inline-flex;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      padding: 34px 21px;
      transition: 0.3s all ease-in-out;
      cursor: pointer;
      .box-holder__item-header {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        .box-holder__item-header__icon {
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
          padding: 10px;
          width: 40px;
          max-width: 40px;
          height: 40px;
          max-height: 40px;
          background: var(--color-base);
          border-radius: 7px;
          margin-left: 15px;
          color: var(--color-white);
        }
        .box-holder__item-header__title {
          font-family: var(--bakh-en-medium);
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 45px;
          text-align: right;
          color: var(--color-base);
        }
      }
      .box-holder__item__content {
        font-family: var(--bakh-en-medium);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        text-align: right;
        color: #000000;
      }
      &.active {
        background: var(--color-base) !important;
        box-shadow: 0px 23.5188px 15.052px -9.40751px rgba(22, 49, 114, 0.15) !important;
        border-radius: 17.8775px !important;
        &:nth-child(1) {
          transform: rotate(4deg) !important;
        }
        &:nth-child(2) {
          transform: rotate(-4deg) !important;
        }
        &:nth-child(3) {
          transform: rotate(-4deg) !important;
        }
        &:nth-child(4) {
          transform: rotate(4deg) !important;
        }
        .box-holder__item-header {
          .box-holder__item-header__icon {
            background: var(--color-white) !important;
            border-radius: 7px !important;
            color: var(--color-base) !important;
          }
          .box-holder__item-header__title {
            color: var(--color-white) !important;
          }
        }
        .box-holder__item__content {
          color: var(--color-white) !important;
        }
      }
    }
  }
}
.custom-container.p-0 {
  width: 100%;
  display: grid;
  padding-top: 0;
  padding-bottom: 0;
  grid-template-rows: repeat(22, 25px);
  grid-template-columns: repeat(10, 1fr);

  .header-group {
    background: #d6e4f0;
    box-shadow: 0px 16px 20px -10px rgba(214, 228, 240, 0.08);
    border-radius: 15px;
    grid-column: 4 / 8;
    grid-row: 1 / 7;
    position: relative;
    z-index: 9;
    padding: 20px;
    background-image: url(./../assets/media/landing/fourth-row/header-bg.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    .article-title {
      font-size: var(--fs-xl);
      margin: 0;
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
    .article-text {
      font-size: var(--fs-md);
      margin: 0;
      width: 100%;
      word-spacing: 0;
      text-align: center;
    }
  }
}
.custom-container.fourth {
  background: #163172;
  grid-row: 4 / -1;
  grid-column: 1 / -1;
  width: 100%;
  .fourth-row {
    padding: 7rem 24px 0px 24px;
    justify-content: space-between;
    .signal-box {
      background: #f6f6f6;
      border-radius: 17.5px;
      padding: 19px 23px;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      .signal-box__header {
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        .signal-box__header-token {
          padding: 0 1rem;
          $size: 42px;
          img {
            width: $size;
            height: $size;
            border-radius: 50%;
          }
          .token-logo {
            transform: translate(-22px, 13px);
            box-shadow: -6px -6px 10px rgba(0, 0, 0, 0.25);
          }
        }
        .signal-box__header-details {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;
          .token-price {
            width: max-content;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            gap: 15px;
            .token-price__name,
            .token-price__value {
              font-family: var(--bakh-en-regular);
              font-size: var(--fs-md);
              font-weight: 600;
              line-height: 24px;
              color: #000000;
            }
          }
          .signal-start {
            width: max-content;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            gap: 15px;
            .signal-start__text,
            .signal-start__time,
            .signal-start__date {
              font-family: var(--bakh-fa-regular);
              font-size: var(--fs-sm);
              line-height: 24px;
              color: #979797;
            }
          }
        }
      }
      .signal-box__body {
        display: grid;
        grid-template-columns: repeat(3, 7.5rem);
        grid-template-rows: repeat(2, auto);
        .signal-box__body-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            margin-bottom: 21px;
          }
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6) {
            grid-row: 2 /2;
          }
          .signal-box__body-detail__title {
            font-family: var(--bakh-fa-regular);
            font-size: var(--fs-sm);
            text-align: center;
            color: #979797;
            margin: 0;
          }
          .signal-box__body-detail__description {
            font-family: var(--bakh-fa-regular);
            font-size: var(--fs-md);
            text-align: center;
            color: #000000;
            margin: 0;
            &.sale {
              color: #00966d !important;
            }
            &.buy {
              color: #e24036 !important;
            }
          }
        }
      }
    }
  }
}
.custom-container.p-0.sixth-bg {
  grid-template-rows: repeat(44, 25px) !important;
}
.custom-container.sixth {
  background: #163172;
  grid-row: 4 / -1;
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10% 7% 5%;
  .subscription-box {
    background: #f6f6f6;
    border-radius: 25px;
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    position: relative;
    .subscription-box__header {
      position: absolute;
      top: -4%;
      background: #f6f6f6;
      width: max-content;
      padding: 10px 60px;
      z-index: 2;
      border-radius: 1rem 1rem 0 0;
      color: #1e56a0;
      font-size: var(--fs-md);
      font-family: var(--bakh-fa-regular);
      -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);

      // &::before {
      //   content: "";
      //   position: absolute;
      //   width: 40px;
      //   height: 100%;
      //   top: 1rem;
      //   left: 0;
      //   right: -18px;
      //   bottom: 0;
      //   background: #f6f6f6;
      //   border-radius: 0 0rem 0 0;
      //   transform: rotate(45deg);
      // }
      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 40px;
      //   height: 100%;
      //   top: 1rem;
      //   left: -18px;
      //   right: auto;
      //   bottom: 0;
      //   background: #f6f6f6;
      //   border-radius: 0 0rem 0 0;
      //   transform: rotate(45deg);
      // }
    }
    .subscription-box__title {
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      .subscription-box__title-img {
        margin-left: 15px;
      }
      .subscription-box__title-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin-left: 65px;
        .header {
          color: var(--color-base);
          font-family: var(--bakh-en-fat);
          line-height: 31px;
          font-size: var(--fs-xl);
          margin: 0;
          margin-bottom: 4px;
          width: 100%;
        }
        .sub-header {
          color: #979797;
          line-height: 21px;
          font-family: var(--bakh-en-light);
          font-size: var(--fs-md);
          margin: 0;
        }
      }
      .subscription-box__title-price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        .header {
          background: linear-gradient(180deg, #163172 0%, #1e56a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          color: var(--color-base);
          font-family: var(--bakh-en-bold);
          line-height: 31px;
          font-size: var(--fs-xl);
          margin: 0;
          margin-bottom: 4px;
          width: 100%;
        }
        .sub-header {
          color: #979797;
          line-height: 21px;
          font-family: var(--bakh-en-light);
          font-size: var(--fs-md);
          margin: 0;
        }
      }
    }
    .subscription-box__body {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      position: relative;
      flex: 1 1 0;
      width: 100%;
      margin: 36px auto 44px auto;
      .subscription-box__body-item {
        display: flex;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        flex: 1 1 0;
        width: 100%;
        margin-bottom: 34px;
        .verify-img {
          margin-left: 13px;
        }
        .content {
          color: var(--color-black);
          font-family: var(--bakh-fa-regular);
          font-size: var(--fs-md);
          line-height: 25px;
          margin: 0;
        }
      }
    }
    .subscription-box__button {
      color: var(--color-white);
      font-family: var(--bakh-fa-regular);
      font-size: var(--fs-md);
      padding: 14px 41px;
      box-shadow: 0px 27px 27px -10px rgba(22, 49, 114, 0.18);
      border-radius: 10px;
    }
  }
}
.fifth-row {
  height: 90vh;
  justify-content: center;
  align-items: center;
  align-content: center;
  .article {
    max-width: 30% !important;
  }
  .timeline-field {
    $grid-row-size: 148px;
    max-width: 70%;
    display: grid;
    grid-template-columns: repeat(15, 70px);
    grid-template-rows: repeat(3, $grid-row-size);
    .timeline-field__item {
      min-width: 30%;
      height: $grid-row-size;
      padding: 30px 36px;
      display: inline-flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      background: #f6f6f6;
      border: 1px solid #1e56a0;
      border-radius: 15px;
      position: relative;
      &:nth-of-type(1) {
        grid-row: 1 / 1;
        grid-column: 1 / 6;
      }
      &:nth-of-type(2) {
        grid-row: 1 / 1;
        grid-column: 9/14;
      }
      &:nth-of-type(3) {
        grid-row: 3 / -1;
        grid-column: 8/13;
      }
      &:nth-of-type(4) {
        grid-row: 3 / -1;
        grid-column: 1/6;
      }
      .timeline-field__item-img {
        margin-left: 20px;
      }
      .timeline-field__item-description {
        color: var(--color-black) !important;
        font-family: var(--bakh-fa-regular);
        line-height: 25px;
        text-align: right;
      }
      .timeline-bullet {
        $size: 25px;
        width: $size;
        height: $size;
        background: #163172;
        box-shadow: 0px 4px 6px rgba(22, 49, 114, 0.2);
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;

        &.right-position {
          right: -1 * ($size / 2);
        }
        &.left-position {
          left: -1 * ($size / 2);
        }
      }
    }
    .timeline-line {
      position: relative;
      &:nth-of-type(1) {
        grid-row: 1/ 1;
        grid-column: 6/9;
      }
      &:nth-of-type(2) {
        grid-row: 1/1;
        grid-column: 14/15;
      }
      &:nth-of-type(3) {
        grid-row: 1 / -1;
        grid-column: 15/16;
        &::before {
          height: 67%;
          width: 1px;
          margin: auto;
          right: -100%;
          left: 0;
        }
      }
      &:nth-of-type(4) {
        grid-row: 3/-1;
        grid-column: 13/15;
      }
      &:nth-of-type(5) {
        grid-row: 3 / -1;
        grid-column: 6 / 8;
      }
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #163172;
        margin: auto;
      }
    }
  }
}
.seventh-row {
  .news-card {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 35px;
    max-width: 66.666%;
    .news-card__item {
      background: #f6f6f6;
      border: 1px solid #d6e4f0;
      border-radius: 25px;
      padding: 11px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-direction: column;
      max-width: 40%;
      .news-card__image {
        width: 100%;
        border-radius: 24px;
        position: relative;
        overflow: hidden;
        margin: 0;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(22, 49, 114, 0.15) 0%,
            rgba(22, 49, 114, 0.7) 100%
          );
          z-index: 3;
        }
        img {
          width: 100%;
          height: 100%;
          max-height: 200px;
        }
        .news-card__image-caption {
          position: absolute;
          top: 24px;
          right: 0;
          padding: 5px 20px;
          font-family: var(--bakh-en-medium);
          font-size: var(--fs-ssm);
          color: var(--color-base);
          background: #d6e4f0;
          border-radius: 14px 0px 0px 14px;
          z-index: 5;
        }
      }
      .news-card__article {
        .news-card__article-title {
          font-family: var(--bakh-en-fat);
          font-size: var(--fs-xl);
          text-align: right;
          color: var(--color-base);
          margin-bottom: 10px !important;
        }
        .news-card__article-description {
          font-family: var(--bakh-en-medium);
          font-size: var(--fs-md);
          text-align: right;
          color: #979797;
        }
      }
      .news-card__data {
        display: flex;
        justify-content: space-evenly;
        align-content: center;
        align-items: center;
        width: 100%;
        .news-card__data-item {
          display: flex;
          align-content: center;
          align-items: center;
          position: relative;
          font-family: var(--bakh-en-medium);
          font-size: var(--fs-sm);
          text-align: right;
          color: #979797;
          gap: 10px;
          &.author {
            &::before {
              content: url(./../assets/media/landing/seventh-row/author.png);
            }
          }
          &.date {
            &::before {
              content: url(./../assets/media/landing/seventh-row/date.png);
            }
          }
          &.time {
            &::before {
              content: url(./../assets/media/landing/seventh-row/time.png);
            }
          }
        }
      }
    }
  }
}
.custom-container.eighth {
  background-image: url(./../assets/media/landing/eighth-row/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .row-holder {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    gap: 10rem;
    .header {
      font-family: var(--bakh-en-heavy);
      font-style: normal;
      font-weight: 400;
      font-size: var(--fs-xl);
      line-height: 37px;
      text-align: right;
      color: var(--color-white);
    }
    .input-box {
      flex: 1 1 0;
      display: flex;
      justify-content: space-evenly;
      .input-field {
        padding: 20px;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        direction: ltr;
        width: 70%;
        background: #ffffff;
        border-radius: 15px;
        &::placeholder {
          font-family: var(--bakh-en-medium);
          font-style: normal;
          font-weight: 400;
          font-size: var(--fs-md);
          line-height: 24px;
          text-align: left;
          color: #979797;
        }
      }
      .input-submit {
        background: #d6e4f0;
        border-radius: 15px;
        padding: 14px 41px;
        font-family: var(--bakh-en-medium);
        font-style: normal;
        font-weight: 400;
        font-size: var(--fs-md);
        line-height: 31px;
        text-align: right;
        color: var(--color-base);
      }
    }
  }
}
</style>
