import React from "react";
import bookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2-removebg-preview.png";
import androidIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/icono-de-android.png";
import huaweiIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/huawei.png";
import appleIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/apple.png";
import facebookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/facebook icono.png";
import twitterIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/x.png";
import instagramIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/instagram.png";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer_Footer__NbyvZ w-100 footer-navbar-color">
    <div className="d-flex flex-column flex-md-row container footer_Footer__info__erf93">
      <section className="col-6 col-md-2 p-0 undefined">
        <img
          className="footer_Footer__image__rHNbP mb-1"
          alt="Wallapop"
          src={bookIcon}
          height="70"
          width="70"
          loading="lazy"
        />
        <span className="NombreLogo">Reedeeks</span>
        <p className="footer_Footer__copyright__Kj9AS">
          Copyright © 2023 Reedeeks © de sus respectivos propietarios
        </p>
      </section>
      <section className="col-6 col-md-2 p-0 px-md-3">
        <p className="footer-section_FooterSection__title__Ddqb5 mb-0">
          <strong>Reedeeks</strong>
        </p>
        <ul className="d-flex flex-column p-0 footer-section_FooterSection__links__31JPp">
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Quiénes somos" rel="nofollow" target="_blank">
              Quiénes somos
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Cómo funciona" rel="nofollow" target="_blank">
              Cómo funciona
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Brand Book" rel="nofollow" target="_blank">
              Brand Book
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Prensa" rel="nofollow" target="_blank">
              Prensa
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Empleo" rel="nofollow" target="_blank">
              Empleo
            </a>
          </li>
        </ul>
      </section>
      <section className="col-6 col-md-2 p-0 px-md-3">
        <p className="footer-section_FooterSection__title__Ddqb5 mb-0">
          <strong>Soporte</strong>
        </p>
        <ul className="d-flex flex-column p-0 footer-section_FooterSection__links__31JPp">
          <li className="footer-link_FooterLink__p_Cca">
            <a
              href=""
              title="Centro de ayuda"
              rel="nofollow"
              target="_blank"
            >
              Centro de ayuda
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a
              href=""
              title="Reglas de publicación"
              rel="nofollow"
              target="_blank"
            >
              Reglas de publicación
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a
              href=""
              title="Consejos de seguridad"
              rel="nofollow"
              target="_blank"
            >
              Consejos de seguridad
            </a>
          </li>
        </ul>
      </section>
      <section className="col-6 col-md-2 p-0 px-md-3">
        <p className="footer-section_FooterSection__title__Ddqb5 mb-0">
          <strong>Legal</strong>
        </p>
        <ul className="d-flex flex-column p-0 footer-section_FooterSection__links__31JPp">
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Aviso legal" rel="nofollow" target="_blank">
              Aviso legal
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Condiciones de uso" rel="nofollow" target="_blank">
              Condiciones de uso
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a
              href=""
              title="Política de privacidad"
              rel="nofollow"
              target="_blank"
            >
              Política de privacidad
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Cookies" rel="nofollow" target="_blank">
              Cookies
            </a>
          </li>
        </ul>
      </section>
      <section className="col-6 col-md-2 p-0 px-md-3">
        <p className="footer-section_FooterSection__title__Ddqb5 mb-0">
          <strong>Motor</strong>
        </p>
        <ul className="d-flex flex-column p-0 footer-section_FooterSection__links__31JPp">
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Particular" rel="nofollow" target="_blank">
              Particular
            </a>
          </li>
          <li className="footer-link_FooterLink__p_Cca">
            <a href="" title="Profesional" rel="nofollow" target="_blank">
              Profesional
            </a>
          </li>
        </ul>
      </section>
    </div>
    <div className="d-flex flex-column flex-md-row footer_Footer__extra__KWJqT footerExtraContainer">
      <section className="footer_Column__apps__Fjj70 d-flex flex-wrap col-12 col-md-8 p-md-0">
        <article className="d-flex align-items-center col-6 col-md-3 p-0">
          <a
            href=""
            target="_blank"
            rel="nofollow noopener"
            title="Apple Store"
            className="footer_Apps__links__d2lcx d-flex align-items-center"
          >
            <img
              src={appleIcon}
              width="29"
              height="28"
              alt="Apple Store"
              loading="lazy"
            />
            <span className="mb-0 ml-2">Apple Store</span>
          </a>
        </article>
        <article className="d-flex align-items-center col-6 col-md-3 p-0">
          <a
            href=""
            target="_blank"
            rel="nofollow noopener"
            title="AppGallery"
            className="footer_Apps__links__d2lcx d-flex align-items-center"
          >
            <img
              src={huaweiIcon}
              width="30"
              height="30"
              alt="AppGallery"
              loading="lazy"
            />
            <span className="mb-0 ml-2">AppGallery</span>
          </a>
        </article>
        <article className="d-flex align-items-center col-6 col-md-3 p-0">
          <a
            href=""
            target="_blank"
            rel="nofollow noopener"
            title="Google Play"
            className="footer_Apps__links__d2lcx d-flex align-items-center"
          >
            <img
              src={androidIcon}
              width="29"
              height="28"
              alt="Google Play"
              loading="lazy"
            />
            <span className="mb-0 ml-2">Google Play</span>
          </a>
        </article>
      </section>
      <section className="col-12 col-md-4 p-md-0 d-flex align-items-center justify-content-start justify-content-md-end footer_Column__social__WTs_C">
		<a
					href="https://facebook.com/"
					rel="nofollow noopener"
					target="_blank"
					title="Facebook"
					className="footer_Social__link__l6DYq"
				>
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						width="20pt" height="20pt" viewBox="0 0 512.000000 512.000000"
						preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
							fill="#DEA54B" stroke="none">
							<path d="M2331 5099 c-316 -28 -644 -123 -929 -268 -259 -133 -429 -258 -647
								-476 -230 -229 -352 -399 -490 -680 -88 -180 -136 -305 -181 -481 -182 -702
								-57 -1458 339 -2049 199 -297 463 -558 757 -746 273 -176 612 -311 913 -363
								l37 -7 0 996 0 995 -305 0 -305 0 0 355 0 355 305 0 305 0 0 268 c0 147 5 317
								10 377 41 431 268 707 660 802 62 15 118 18 320 18 135 0 298 -4 363 -8 l117
								-9 0 -319 0 -319 -172 0 c-353 -1 -460 -31 -517 -145 -34 -69 -41 -135 -41
								-406 l0 -259 356 0 356 0 -6 -32 c-6 -39 -86 -654 -86 -668 0 -6 -115 -11
								-307 -12 l-308 -3 -3 -1003 -2 -1002 42 6 c460 66 899 258 1263 551 125 101
								328 309 421 434 587 779 688 1801 264 2664 -142 291 -263 458 -495 690 -218
								218 -388 343 -647 476 -424 216 -911 310 -1387 268z"/>
						</g>
					</svg>
		</a>

        <a
          href="https://twitter.com"
          rel="nofollow noopener"
          target="_blank"
          title=" Twitter"
          className="footer_Social__link__l6DYq"
        >
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						width="25pt" height="25pt" viewBox="0 0 499.000000 499.000000"
						preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,499.000000) scale(0.100000,-0.100000)"
							fill="#DEA54B" stroke="none">
							<path d="M2405 4525 c-11 -2 -72 -8 -135 -15 -157 -15 -409 -76 -490 -117 -14
									-7 -31 -13 -39 -13 -7 0 -30 -8 -50 -18 -20 -11 -61 -31 -91 -46 -117 -57
									-320 -183 -320 -198 0 -4 -5 -8 -12 -8 -6 0 -18 -7 -27 -15 -9 -8 -38 -34 -66
									-57 -64 -54 -169 -159 -223 -223 -23 -27 -49 -57 -57 -66 -8 -9 -15 -21 -15
									-27 0 -7 -4 -12 -8 -12 -15 0 -141 -203 -198 -320 -58 -119 -64 -132 -64 -143
									0 -7 -6 -23 -13 -37 -18 -36 -61 -179 -85 -285 -61 -268 -61 -592 0 -860 24
									-106 67 -249 85 -285 7 -14 13 -30 13 -37 0 -6 8 -28 18 -50 10 -21 29 -60 42
									-88 13 -27 32 -62 42 -77 10 -14 18 -31 18 -37 0 -7 5 -17 10 -24 18 -22 58
									-81 90 -135 17 -28 36 -52 41 -52 5 0 9 -6 9 -13 0 -7 8 -20 17 -29 10 -9 36
									-38 58 -64 49 -61 154 -166 220 -222 28 -23 57 -49 66 -57 9 -8 21 -15 27 -15
									7 0 12 -4 12 -9 0 -5 24 -24 53 -41 53 -32 112 -72 134 -90 7 -5 17 -10 24
									-10 6 0 23 -8 37 -18 15 -10 50 -29 77 -42 28 -13 67 -32 88 -42 22 -10 44
									-18 50 -18 7 0 23 -6 37 -13 36 -18 179 -61 285 -85 268 -61 592 -61 860 0
									106 24 249 67 285 85 14 7 30 13 37 13 6 0 28 8 50 18 21 10 61 29 88 42 28
									13 62 32 77 42 14 10 31 18 37 18 7 0 17 5 24 10 22 18 81 58 135 90 28 17 52
									36 52 41 0 5 5 9 12 9 6 0 18 7 27 15 9 8 39 34 66 57 66 56 171 161 220 222
									22 26 48 55 58 64 9 9 17 22 17 29 0 7 4 13 9 13 5 0 24 24 41 53 32 53 72
									112 90 134 5 7 10 17 10 24 0 6 8 23 18 37 10 15 29 50 42 77 13 28 32 67 42
									88 10 22 18 44 18 50 0 7 6 23 13 37 18 36 61 179 85 285 61 268 61 592 0 860
									-24 106 -67 249 -85 285 -7 14 -13 30 -13 37 0 27 -146 308 -180 348 -10 11
									-30 41 -45 68 -15 26 -31 47 -36 47 -5 0 -9 5 -9 12 0 6 -7 18 -15 27 -8 9
									-34 39 -57 66 -54 64 -159 169 -223 223 -27 23 -57 49 -66 57 -9 8 -21 15 -27
									15 -7 0 -12 4 -12 8 0 15 -203 141 -320 198 -119 58 -132 64 -143 64 -7 0 -23
									6 -37 13 -72 37 -322 99 -465 116 -99 12 -309 22 -340 16z m-445 -801 c14 -20
									33 -43 43 -52 9 -9 17 -20 17 -24 0 -4 6 -16 14 -25 52 -64 107 -134 134 -173
									17 -25 52 -72 77 -105 25 -33 68 -89 95 -125 27 -36 70 -92 95 -125 25 -33 62
									-84 82 -112 20 -29 40 -53 44 -53 5 0 9 -5 9 -11 0 -19 73 -101 80 -89 7 12
									211 230 303 323 31 32 57 61 57 64 0 3 25 29 55 59 30 30 55 57 55 60 0 3 26
									31 58 63 31 33 107 112 167 177 61 64 124 132 142 151 l31 33 114 0 c82 -1
									108 -3 95 -11 -9 -5 -17 -14 -17 -19 0 -5 -22 -31 -48 -57 -27 -26 -102 -106
									-167 -178 -65 -71 -140 -152 -167 -178 -26 -26 -48 -50 -48 -53 0 -3 -27 -33
									-60 -67 -116 -118 -148 -153 -265 -282 -65 -71 -140 -152 -166 -179 l-48 -48
									26 -39 c14 -21 30 -39 34 -39 5 0 9 -4 9 -10 0 -12 90 -132 108 -143 6 -4 12
									-15 12 -22 0 -8 3 -15 8 -15 4 -1 23 -24 42 -52 19 -28 43 -58 53 -66 9 -9 17
									-20 17 -25 0 -4 5 -13 10 -20 23 -27 106 -136 120 -157 8 -12 20 -28 25 -34 6
									-6 27 -34 48 -61 20 -28 46 -61 57 -75 18 -23 35 -46 126 -167 19 -27 57 -77
									84 -113 106 -140 150 -201 150 -206 0 -2 8 -13 18 -23 31 -34 62 -73 62 -78 0
									-2 15 -23 33 -46 19 -23 37 -48 41 -55 6 -9 -75 -12 -389 -12 l-395 0 -33 46
									c-36 53 -118 160 -141 187 -9 9 -16 19 -16 21 0 9 -102 141 -111 144 -5 2 -9
									8 -9 12 0 8 -95 139 -109 150 -3 3 -10 12 -16 21 -37 59 -89 129 -96 129 -5 0
									-9 4 -9 9 0 12 -99 145 -111 149 -5 2 -9 8 -9 13 0 5 -17 31 -37 57 l-38 47
									-45 -48 c-52 -55 -150 -159 -219 -232 -26 -27 -99 -106 -162 -175 -62 -69
									-135 -147 -161 -173 -26 -26 -48 -50 -48 -53 0 -3 -26 -31 -57 -63 -32 -32
									-97 -99 -144 -150 l-86 -92 -111 3 -112 3 85 90 c46 50 115 123 152 164 37 41
									88 95 113 121 25 26 97 103 160 171 63 68 135 145 160 171 25 26 77 82 115
									124 39 43 90 99 115 124 102 107 140 150 140 157 0 7 -66 94 -125 166 -8 9
									-15 21 -15 25 0 4 -8 15 -17 24 -10 9 -29 33 -43 53 -14 20 -33 46 -42 56 -10
									10 -18 21 -18 24 0 5 -22 36 -150 205 -27 36 -79 106 -116 155 -36 50 -70 92
									-75 93 -5 2 -9 8 -9 12 0 8 -95 139 -109 150 -3 3 -10 12 -16 21 -5 9 -37 53
									-70 99 -33 45 -64 89 -70 98 -5 8 -17 23 -25 33 -40 46 -60 71 -60 76 0 2 -15
									23 -33 46 -19 23 -37 48 -41 55 -6 9 73 12 381 12 l388 -1 25 -35z"/>
							<path d="M1510 3585 c0 -6 17 -28 217 -293 26 -35 64 -85 83 -112 84 -116 136
									-184 153 -201 9 -11 17 -22 17 -27 0 -4 8 -15 18 -24 9 -8 33 -38 52 -66 19
									-28 38 -51 43 -52 4 0 7 -6 7 -13 0 -7 8 -20 18 -29 9 -8 33 -38 52 -66 19
									-28 38 -51 43 -52 4 0 7 -6 7 -13 0 -7 8 -20 18 -29 9 -8 33 -38 52 -66 19
									-28 38 -51 43 -52 4 0 7 -6 7 -14 0 -8 4 -16 9 -18 12 -4 261 -337 261 -348 0
									-4 4 -10 9 -12 8 -3 111 -135 111 -143 0 -4 34 -46 63 -76 9 -10 17 -21 17
									-23 0 -9 102 -141 111 -144 5 -2 9 -8 9 -13 0 -10 101 -142 112 -147 5 -2 8
									-10 8 -18 0 -8 7 -17 15 -20 8 -4 15 -10 15 -16 0 -5 14 -27 32 -49 l31 -39
									175 0 174 0 -18 28 c-10 15 -22 32 -28 38 -6 6 -18 22 -26 34 -30 45 -85 115
									-92 118 -5 2 -8 9 -8 16 0 6 -8 19 -17 28 -10 8 -34 38 -53 66 -19 28 -38 51
									-42 52 -5 0 -8 5 -8 12 0 6 -7 18 -15 27 -33 35 -105 130 -105 139 0 6 -7 12
									-15 16 -8 3 -15 12 -15 21 0 8 -3 15 -7 15 -5 1 -24 24 -43 52 -19 28 -43 58
									-52 66 -10 9 -18 22 -18 29 0 7 -3 13 -7 13 -5 1 -24 24 -43 52 -19 28 -43 58
									-52 66 -10 9 -18 22 -18 28 0 7 -3 14 -7 16 -5 2 -25 26 -46 53 -20 28 -46 61
									-57 75 -80 104 -215 287 -235 319 -5 9 -13 18 -16 21 -14 11 -109 142 -109
									150 0 4 -4 10 -9 12 -5 2 -46 53 -91 113 -45 61 -86 112 -91 113 -5 2 -9 7 -9
									12 0 5 -43 66 -95 137 -53 70 -115 154 -138 185 l-42 58 -177 0 c-98 0 -178
									-2 -178 -5z"/>
						</g>
					</svg>

        </a>
		<a
		href="https://instagram.com"
		rel="nofollow noopener"
		target="_blank"
		title="Instagram"
		className="footer_Social__link__l6DYq"
		>
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						width="22pt" height="22pt" viewBox="0 0 500.000000 500.000000"
						preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
							fill="#DEA54B" stroke="none">
							<path d="M2340 4989 c-176 -11 -258 -24 -454 -74 -471 -119 -868 -353 -1207
								-710 -316 -334 -535 -767 -629 -1243 -29 -150 -40 -275 -40 -472 0 -214 11
								-326 51 -515 136 -645 543 -1226 1114 -1589 264 -168 665 -316 960 -355 516
								-68 980 1 1425 211 174 82 375 208 516 323 91 74 275 260 353 355 260 319 425
								664 505 1055 50 244 56 307 51 545 -6 274 -9 302 -50 495 -136 632 -464 1135
								-995 1522 -280 203 -667 362 -1045 427 -76 13 -389 39 -420 34 -5 0 -66 -4
								-135 -9z m935 -938 c356 -53 606 -243 718 -546 67 -181 72 -254 72 -1015 0
								-766 -7 -850 -90 -1045 -76 -177 -263 -356 -456 -435 -168 -70 -394 -85 -1164
								-77 -593 6 -688 13 -837 65 -197 67 -362 207 -465 392 -36 64 -78 190 -92 275
								-21 119 -31 398 -31 820 0 653 17 872 79 1028 47 118 99 197 190 288 168 168
								330 234 635 259 152 12 1344 5 1441 -9z"/>
							<path d="M1949 3770 c-215 -11 -300 -28 -406 -80 -181 -89 -271 -239 -305
								-505 -17 -134 -16 -1225 2 -1370 46 -383 203 -537 590 -577 163 -17 1218 -16
								1364 0 253 30 411 124 493 294 73 151 82 257 82 1048 1 610 -2 661 -49 813
								-22 71 -80 166 -131 214 -88 82 -216 132 -394 153 -118 14 -1021 21 -1246 10z
								m1482 -272 c62 -34 89 -85 89 -163 0 -76 -14 -109 -64 -152 -80 -71 -219 -48
								-283 46 -18 27 -23 48 -23 103 0 83 15 115 72 157 37 27 50 31 106 31 47 0 74
								-6 103 -22z m-721 -218 c108 -31 204 -80 288 -149 134 -111 213 -220 265 -368
								28 -79 31 -102 35 -235 3 -112 0 -165 -12 -221 -57 -254 -274 -487 -536 -577
								-90 -31 -312 -39 -422 -17 -250 52 -469 233 -574 476 -64 150 -73 407 -19 569
								81 242 274 430 530 516 119 41 312 43 445 6z"/>
							<path d="M2415 3010 c-155 -32 -296 -135 -369 -270 -31 -57 -66 -186 -66 -244
								0 -110 69 -271 152 -356 97 -99 223 -150 371 -150 208 0 369 104 464 298 155
								321 -74 697 -442 725 -38 3 -88 2 -110 -3z"/>
							</g>
						</svg>		
		</a>
      </section>
    </div>
  </footer>
);


