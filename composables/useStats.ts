import Stats from 'stats.js'
import { onMounted, onUnmounted } from 'vue'

export function useStats () {
  let stats: Stats | null
  let finish = false

  function update () {
    if (finish) return
    stats?.begin()
    stats?.update()
    requestAnimationFrame(update)
  }

  function setup () {
    stats = new Stats()

    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.top = '64px'
    stats.dom.style.left = 'auto'
    stats.dom.style.right = '0px'

    document.body.appendChild(stats.dom)
    update()
  }

  function dispose () {
    finish = true
    stats?.dom?.remove()
    stats = null
  }

  onMounted(setup)
  onUnmounted(dispose)
}
