# 실무에서 활용한 자바스크립트 패턴

## 1. 클로져(Closures)

### 1.1. 디바운스 함수(debounce)

```ts
function debounce(callBackFunc: () => void, delay = 100) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callBackFunc, delay);
  };
}
```

#### 디바운스 함수 응용: 브라우저 화면을 변화시킬 때 화면 크기 측정

```ts
import { useState, useRef, useEffect } from "react";

import debounce from "../../utils/debounce";
import {
  GAME_CONSOLE_RATIO,
  DEFAULT_SCREEN_HEIGHT,
  DEFAULT_SCREEN_WIDTH,
} from "../constants";
import { GameScreen } from "../types";

export default function useGameScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [gameScreen, setGameScreen] = useState({
    // 최초로 화면 크기 측정이 완료되었는지 여부
    isReady: false,
    // 전체 화면 크기
    screen: {
      height: DEFAULT_SCREEN_HEIGHT,
      width: DEFAULT_SCREEN_WIDTH,
    },
    // 캔버스 크기
    canvas: {
      height: DEFAULT_SCREEN_HEIGHT,
      width: DEFAULT_SCREEN_WIDTH,
    },
  });

  // 전체 화면 크기와 적정한 캔버스 크기 측정
  const measureScreenSize = () => {
    if (containerRef.current !== null) {
      const vh = containerRef.current.clientHeight;
      const vw = containerRef.current.clientWidth;
      if (vh - 64 >= vw * GAME_CONSOLE_RATIO) {
        // 화면 높이(height)가 너비(width) 보다 상대적으로 긴 경우
        setGameScreen({
          isReady: true,
          screen: {
            height: vh,
            width: vw,
          },
          canvas: {
            height: Math.ceil(vw * GAME_CONSOLE_RATIO),
            width: vw,
          },
        });
      } else {
        // 화면 높이(height)가 너비(width) 보다 상대적으로 짧은 경우
        setGameScreen({
          isReady: true,
          screen: {
            height: vh,
            width: vw,
          },
          canvas: {
            height: vh - 64,
            width: Math.ceil((vh - 64) / GAME_CONSOLE_RATIO),
          },
        });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      measureScreenSize();

      // 화면 크기 조절 중인지 여부를 판단
      setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };
    measureScreenSize();

    const debouncedHandleResize = debounce(handleResize);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return {
    containerRef,
    gameScreen: { isResizing, ...gameScreen } as GameScreen,
  };
}
```

### 1.2. 클로져를 활용한 간이 `i18next` 함수

```ts
import { Locale } from "@/src/lib/types/i18n";

import ENGLISH from "./locales/en.json";
import KOREAN from "./locales/ko.json";

export type GameI18nDictionary = keyof typeof KOREAN;

export default function i18n(locale: Locale) {
  if (locale === "ko") {
    return function t(key: keyof typeof KOREAN) {
      return KOREAN[key] || key;
    };
  }
  return function t(key: keyof typeof ENGLISH) {
    return ENGLISH[key] || key;
  };
}
```

## 특이한 패턴

```ts
export default class SharkSelectScene extends Scene {
  /** ... 생략 ... */

  constructor(/** ... 생략 ... */) {
    /** ... 생략 ... */
  }

  onStartCustom = async () => {
    /** ... 생략 ... */
    const rentCheckButton = await makeCheckButton(
      /** ... 생략 ... */

      // 콜백 함수
      (checked: boolean) => {
        // this.state.buyCheckButton는 아직 정의되지 않았음 (undefined)
        this.state.buyCheckButton.setChecked(false);
      }
    );
    const buyCheckButton = await makeCheckButton(
      /** ... 생략 ... */

      // 콜백 함수
      (checked: boolean) => {
        // this.state.rentCheckButton는 아직 정의되지 않았음 (undefined)
        this.state.rentCheckButton.setChecked(false);
      }
    );

    // 하단에서 정의됨. 그러나 콜백 함수가 호출될 때는 정상적으로 동작함
    this.state.rentCheckButton = rentCheckButton;
    this.state.buyCheckButton = buyCheckButton;

    /** ... 생략 ... */
  };
}
```
