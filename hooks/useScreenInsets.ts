import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { HeaderHeightContext } from "@react-navigation/elements";

import { Spacing } from "@/constants/theme";

export function useScreenInsets() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;
  const headerHeight = useContext(HeaderHeightContext) ?? insets.top;

  return {
    paddingTop: headerHeight > 0 ? headerHeight + Spacing.xl : insets.top + Spacing.xl,
    paddingBottom: tabBarHeight > 0 ? tabBarHeight + Spacing.xl : insets.bottom + Spacing.xl,
    scrollInsetBottom: insets.bottom + 16,
    tabBarHeight,
    headerHeight,
  };
}
