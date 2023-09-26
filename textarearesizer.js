/*  *******************************************************
    TEXTAREA RESIZER

    By Walter Staeblein - 2023
    MIT Licence - https://choosealicense.com/licenses/mit/

    https://github.com/wstaeblein/textarearesizer
    *******************************************************/ 
    class textAreaResizer {

        constructor(ele) {
            if (ele.tagName != 'TEXTAREA') { 
                throw 'Target element must be a textarea'; 
                return;
            }

            let styles = window.getComputedStyle(ele);
            this.ele = ele;
   
            if (ele.parentNode.style.position == 'static') {
                ele.parentNode.style.position = relative;
                this.originalStatic = true;
            }
            this.originalResize = styles.resize;
            this.originalOverflowX = styles.overflowX;
            this.originalOverflowY = styles.overflowY;
            if ('both vertical'.includes(this.ele.style.resize)) { this.ele.style.resize = 'none'; }
            this.ele.style.overflowX = 'hidden';
            this.ele.style.overflowY = 'hidden';

            this.handler = this.#adjustHeight.bind(this),
            this.ele.addEventListener('input', this.handler);

            let shadowBox = document.createElement('div');
            shadowBox.style.visibility = 'hidden';
            shadowBox.style.position = 'fixed';
            shadowBox.style.Left = '110%';
            
            this.shadowBox = shadowBox;
            document.body.append(this.shadowBox)
    
            this.observer = new ResizeObserver(this.#resizeObs.bind(this));
            this.observer.observe(this.ele);
            this.#resizeObs();
            this.handler();
        }
        
        getHeight() {
            let eleRules = window.getComputedStyle(this.ele);
            let shadowHeight = parseFloat(window.getComputedStyle(this.shadowBox).height);
            let eleHeight = parseFloat(eleRules.height);
            let maxHeight = parseFloat(eleRules.maxHeight);
            return { textarea: this.ele.style.height, text: shadowHeight, max: maxHeight };
        }

        update() {
            this.#adjustHeight();
        }


        destroy() {
            this.ele.removeEventListener('input', this.handler);
            this.observer.disconnect();
            this.shadowBox.remove();

            this.ele.style.resize = this.originalResize;
            this.ele.style.overflowX = this.originalOverflowX;
            this.ele.style.overflowY = this.originalOverflowY;
            this.ele.style.resize = this.originalResize;
            if (this.originalStatic) { ele.parentNode.style.position = 'static'; }
        }

        #resizeObs() { 
            let styles = window.getComputedStyle(this.ele);
            let props = ['width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'borderTop', 'letterSpacing', 'fontVariant', 'fontKerning',
                         'borderLeft', 'borderRight', 'borderBottom', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',  'textEmphasis', 'textTransform'];
            props.forEach((stl) => this.shadowBox.style[stl] = styles[stl]);
        }

        #adjustHeight() { console.log('adjustHeight', this.ele.style.height)
            this.shadowBox.innerText = this.ele.value;
            let newHeight = parseFloat(window.getComputedStyle(this.shadowBox).height);
            let maxHeight = parseFloat(window.getComputedStyle(this.ele).maxHeight);
 
            this.ele.style.height = newHeight + 'px';

            if (newHeight > maxHeight) {
                if (this.ele.style.overflowY != 'auto') { this.ele.style.overflowY = 'auto'; }
            } else {
                if (this.ele.style.overflowY != 'hidden') { this.ele.style.overflowY = 'hidden'; }
            }
        }
    }