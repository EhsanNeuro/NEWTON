import { Computed } from '@telegram-apps/signals';
import { State } from './types.js';
/**
 * Complete component state.
 */
export declare const state: import('@telegram-apps/signals').Signal<State>;
/**
 * True if the component is currently mounted.
 */
export declare const isMounted: import('@telegram-apps/signals').Signal<boolean>;
/**
 * True if CSS variables are currently bound.
 */
export declare const isCssVarsBound: import('@telegram-apps/signals').Signal<boolean>;
/**
 * True if the component is currently mounting.
 */
export declare const isMounting: import('@telegram-apps/signals').Signal<boolean>;
/**
 * Error occurred while mounting the component.
 */
export declare const mountError: import('@telegram-apps/signals').Signal<Error | undefined>;
/**
 * The current height of the **visible area** of the Mini App.
 *
 * The application can display just the top part of the Mini App, with its lower part remaining
 * outside the screen area. From this position, the user can "pull" the Mini App to its
 * maximum height, while the bot can do the same by calling `expand` method. As the position of
 * the Mini App changes, the current height value of the visible area will be updated  in real
 * time.
 *
 * Please note that the refresh rate of this value is not sufficient to smoothly follow the
 * lower border of the window. It should not be used to pin interface elements to the bottom
 * of the visible area. It's more appropriate to use the value of the `stableHeight`
 * field for this purpose.
 *
 * @see stableHeight
 */
export declare const height: Computed<number | undefined>;
/**
 * True if the Mini App is expanded to the maximum available height. Otherwise, if
 * the Mini App occupies part of the screen and can be expanded to the full height using
 * `expand` method.
 * @see expand
 */
export declare const isExpanded: Computed<boolean | undefined>;
/**
 * True if the current viewport height is stable and is not going to change in the next moment.
 */
export declare const isStable: Computed<boolean>;
/**
 * The height of the visible area of the Mini App in its last stable state.
 *
 * The application can display just the top part of the Mini App, with its lower part remaining
 * outside the screen area. From this position, the user can "pull" the Mini App to its
 * maximum height, while the application can do the same by calling `expand` method.
 *
 * Unlike the value of `height`, the value of `stableHeight` does not change as the position
 * of the Mini App changes with user gestures or during animations. The value of `stableHeight`
 * will be updated after all gestures and animations are completed and the Mini App reaches its
 * final size.
 *
 * @see height
 */
export declare const stableHeight: Computed<number | undefined>;
/**
 * Currently visible area width.
 */
export declare const width: Computed<number | undefined>;
