export const canvasMock = {
  getContext: () => {
    return {
      moveTo: () => { },
      lineTo: () => { },
      beginPath: () => { },
      clearRect: () => { },
      stroke: () => { },
      drawImage: () => { },
      strokeStyle: "",
      lineWidth: "",
    }
  },
  toDataURL: () => { return {} },
  width: 600,
  height: 400
}