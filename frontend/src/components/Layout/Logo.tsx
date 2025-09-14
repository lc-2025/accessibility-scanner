import '../../css/components/Logo.css';

/**
 * @description Logo component
 * @author Luca Cattide
 * @returns {*}
 */
function Logo() {
  return (
    <aside className="logo relative hidden h-auto w-full max-w-[248px] min-w-[248px] overflow-hidden bg-size-[100%] bg-left-top bg-no-repeat pb-[3rem] sm:inline-block">
      {/* Image-Replacement */}
      <h6 className="logo__title text-default absolute right-full">
        Accessibility Scanner for AccessiWay
      </h6>
    </aside>
  );
}

export default Logo;
