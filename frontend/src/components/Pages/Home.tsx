import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '../../utils/constants';
import '../../css/components/Home.css';

/**
 * @description Home page component
 * @author Luca Cattide
 * @returns {*}
 */
function Home() {
  const { t } = useTranslation();

  // TODO:
  /* const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }; */

  /**
   * @description Headline anchor handler
   * @author Luca Cattide
   * @date 13/09/2025
   * @param {React.MouseEvent<HTMLElement>} e
   */
  const handleAnchor = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    document.getElementsByClassName('summary')[0].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* Home Start */}
      <div className="home flex w-full snap-proximity flex-col items-center">
        <h6 className="home__title hidden">Home page</h6>
        {/* Headline Start */}
        <section className="home__headline flex min-h-[40rem] w-full flex-col items-center justify-center bg-fixed px-4">
          <h6 className="headline__title hidden">Headline</h6>
          <hgroup className="headline__titles bg-primary rounded-2xl px-4 pt-12 pb-16 text-center text-white sm:px-12">
            <h1 className="titles__title mb-4 text-3xl font-bold uppercase">
              {t('headline.title')}
            </h1>
            <h2 className="titles__tagline mb-12 text-2xl">
              {t('headline.tagline')}
            </h2>
            <a
              className="titles__cta text-primary rounded-2xl bg-white px-8 py-4 text-2xl font-bold uppercase transition-opacity select-none hover:opacity-75 sm:text-4xl"
              href="#summary"
              onClick={handleAnchor}
              title={t('headline.cta.title')}
            >
              {t('headline.cta.label')}
            </a>
          </hgroup>
        </section>
        {/* Headline End */}
        {/* Summary Start */}
        <section
          className="summary bg-primary flex min-h-[40rem] w-full flex-col items-end justify-center bg-cover bg-no-repeat px-4 py-12 bg-blend-screen sm:px-12"
        >
          <h6 className="summary__title hidden">Summary</h6>
          <article className="summary__article bg-accent text-default flex w-full flex-col items-center rounded-2xl px-12 pt-12 pb-16 sm:w-2/3 lg:mr-32 lg:w-1/3">
            <h2 className="article__title mb-4 w-full font-bold">
              {t('summary.title')}
            </h2>
            <p className="article__body mb-12">{t('summary.body')}</p>
            <Link
              className="titles__cta bg-primary rounded-2xl px-8 py-4 text-center font-bold text-white uppercase transition-opacity select-none hover:opacity-75"
              title={t('summary.cta.title')}
              to={ROUTE.SCAN.PATH}
            >
              {t('summary.cta.label')}
            </Link>
          </article>
        </section>
        {/* Summary End */}
      </div>
      {/* Home End */}
      {/* TODO:
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('it')}>Ita</button> */}
    </>
  );
}

export default Home;
