/**
 * Robert Penner's Easing Functions
 *
 * This code is derived from or based on Robert Penner's Easing Equations.
 * Open source under the BSD License.
 *
 * Copyright (c) 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const Easing = {
  // Sine
  sine: {
    in: function(x) {
      if (x < 0) return 0;
      return 1 - Math.cos((x * Math.PI) / 2);
    },
    out: function(x) {
      if (x < 0) return 0;
      return Math.sin((x * Math.PI) / 2);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return -(Math.cos(Math.PI * x) - 1) / 2;
    }
  },

  // Quad
  quad: {
    in: function(x) {
      if (x < 0) return 0;
      return x * x;
    },
    out: function(x) {
      if (x < 0) return 0;
      return 1 - (1 - x) * (1 - x);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
  },

  // Cubic
  cubic: {
    in: function(x) {
      if (x < 0) return 0;
      return x * x * x;
    },
    out: function(x) {
      if (x < 0) return 0;
      return 1 - Math.pow(1 - x, 3);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
  },

  // Quart
  quart: {
    in: function(x) {
      if (x < 0) return 0;
      return x * x * x * x;
    },
    out: function(x) {
      if (x < 0) return 0;
      return 1 - Math.pow(1 - x, 4);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }
  },

  // Quint
  quint: {
    in: function(x) {
      if (x < 0) return 0;
      return x * x * x * x * x;
    },
    out: function(x) {
      if (x < 0) return 0;
      return 1 - Math.pow(1 - x, 5);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    }
  },

  // Expo
  expo: {
    in: function(x) {
      if (x < 0) return 0;
      return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    },
    out: function(x) {
      if (x < 0) return 0;
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }
  },

  // Circ
  circ: {
    in: function(x) {
      if (x < 0) return 0;
      return 1 - Math.sqrt(1 - Math.pow(x, 2));
    },
    out: function(x) {
      if (x < 0) return 0;
      return Math.sqrt(1 - Math.pow(x - 1, 2));
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }
  },

  // Back
  back: {
    in: function(x) {
      if (x < 0) return 0;
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return c3 * x * x * x - c1 * x * x;
    },
    out: function(x) {
      if (x < 0) return 0;
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      const c1 = 1.70158;
      const c2 = c1 * 1.525;
      return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }
  },

  // Elastic
  elastic: {
    in: function(x) {
      if (x < 0) return 0;
      const c4 = (2 * Math.PI) / 3;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    },
    out: function(x) {
      if (x < 0) return 0;
      const c4 = (2 * Math.PI) / 3;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    },
    inOut: function(x) {
      if (x < 0) return 0;
      const c5 = (2 * Math.PI) / 4.5;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }
  },

  // Bounce
  bounce: {
    // easeOutBounceは内部で使うので、先に定義します
    _out: function(x) {
      if (x < 0) return 0;
      const n1 = 7.5625;
      const d1 = 2.75;

      if (x < 1 / d1) {
        return n1 * x * x;
      } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
      } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
      } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
      }
    },
    in: function(x) {
      if (x < 0) return 0;
      return 1 - Easing.bounce._out(1 - x);
    },
    out: function(x) {
      // 上で定義した _out を呼び出す
      return Easing.bounce._out(x);
    },
    inOut: function(x) {
      if (x < 0) return 0;
      return x < 0.5
        ? (1 - Easing.bounce._out(1 - 2 * x)) / 2
        : (1 + Easing.bounce._out(2 * x - 1)) / 2;
    }
  }
};