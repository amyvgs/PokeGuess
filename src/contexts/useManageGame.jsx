import { create } from "zustand";

const MAX_POINTS = 100;

const useManageGame = create((set) => ({
  // state
  points: JSON.parse(sessionStorage.getItem("points")) || 100,
  streak: JSON.parse(sessionStorage.getItem("streak")) || 0,
  isValid: JSON.parse(sessionStorage.getItem("isValid")) || false,
  generation: JSON.parse(sessionStorage.getItem("generation")) || 0,

  // actions
  setGeneration: (value) => {
    sessionStorage.setItem("generation", JSON.stringify(value));
    sessionStorage.setItem("isValid", JSON.stringify(true));
    set({ generation: value, isValid: true });
  },

  resetGeneration: () => {
    sessionStorage.removeItem("generation");
    set({ generation: 0, isValid: false });
  },

  incrementStreak: () => {
    set((state) => ({streak: state.streak + 1}));
  },

  increment: () => {
    set((state) => {
      if(state.points !== MAX_POINTS){
        const newPoints = state.points + 10
        sessionStorage.setItem("points", JSON.stringify(newPoints));
        sessionStorage.setItem("streak", JSON.stringify(0));
        return {points: state.points + 10, streak: 0};
      }
      sessionStorage.setItem("streak", JSON.stringify(0))
      return {streak: 0}
    });
  },

  decrement: () => {
    set((state) => {
      sessionStorage.setItem("points", JSON.stringify(state.points - 10));
      sessionStorage.setItem("streak", JSON.stringify(0));
      return { points: state.points - 10, streak: 0 };
    })
  },

  resetGame: () => {
    set((state) => {
      sessionStorage.clear();
      return {points: 100, streak: 0, isValid: false}
    })
  },
}));

export default useManageGame;
