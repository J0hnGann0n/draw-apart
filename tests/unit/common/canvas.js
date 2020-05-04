export const canvasMock = {
  getContext: () => {
    return {
      moveTo: () => { },
      lineTo: () => { },
      beginPath: () => { },
      clearRect: () => { },
      stroke: () => { },
      strokeStyle: "",
      lineWidth: "",
    }
  },
  toDataURL: () => { },
  width: 600,
  height: 400
}