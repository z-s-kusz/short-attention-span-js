<template>
  <transition name="modal">
    <div class="modal-mask" @click="maskClick($event)">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3 name="header">
              {{ header }}
            </h3>
          </div>

          <div class="modal-body">
            <span name="body" v-html="body">
            </span>
          </div>

          <div class="modal-footer">
            <span name="footer">
              {{ footer }}
              <button class="modal-default-button" @click="$emit('close-modal')">
                Close
              </button>
            </span>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DefaultModal',
  props: {
    header: String,
    body: String,
    footer: String,
    closeOnOutsideClick: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    maskClick($event: { target: HTMLInputElement}): void {
      if (this.closeOnOutsideClick && $event.target.className === 'modal-wrapper') {
        this.$emit('close-modal');
      }
    },
  },
});
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #444;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  color: #9aecc7;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

span {
  text-align: left;
}
</style>
