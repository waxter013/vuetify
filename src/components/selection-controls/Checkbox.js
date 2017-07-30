import Selectable from '~mixins/selectable'

export default {
  name: 'checkbox',

  mixins: [Selectable],

  data () {
    return {
      inputDeterminate: this.indeterminate
    }
  },

  props: {
    indeterminate: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes () {
      return this.addColorClassChecks({
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      })
    },
    icon () {
      if (this.inputDeterminate) {
        return 'indeterminate_check_box'
      } else if (this.isActive) {
        return 'check_box'
      } else {
        return 'check_box_outline_blank'
      }
    }
  },

  render (h) {
    const transition = h('v-fade-transition', [
      h('v-icon', {
        'class': {
          'icon--checkbox': this.icon === 'check_box'
        },
        key: this.icon
      }, this.icon)
    ])

    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: Object.assign({}, {
        click: this.toggle
      }, this.$listeners),
      directives: [{
        name: 'ripple',
        value: this.ripple
      }]
    })

    return this.genInputGroup([transition, ripple])
  }
}
