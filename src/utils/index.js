import React, { Component, createRef } from 'react';
import { delay, propTypeValidation, contentInView } from './utils';
import './app.css';

class TypeWriterEffect extends Component {
  state = {
    text: [],
    blink: false,
    animate: false,
    typeSpeedDelay: null,
    multiTextDelay: null,
    eraseSpeedDelay: null,
    startDelay: null,
    scrollAreaIsSet: null,
    multiTextLoop: false,
  };

  myRef = createRef();

  multiTextDisplay = async (arr) => {
    for (let e = 0; e < arr.length; e++) {
      await this.runAnimation(arr[e], e);
    }
    this.props.onDisplayFinish?.();
  };

  runAnimation = async (str, index) => {
    const textArr = typeof str == 'string' && str.trim().split('');
    if (textArr) {
      this.setState({
        blink: false,
      });
      let text = '';
      const typeSpeedDelay = new delay(this.props.typeSpeed || 80);
      const multiTextDelay =
        this.props.multiText && new delay(this.props.multiTextDelay || 500);
      this.setState({
        typeSpeedDelay,
        multiTextDelay,
      });
      for (let char = 0; char < textArr.length; char++) {
        await typeSpeedDelay.getPromise();
        text += textArr[char];
        this.state.text[index] = text;
        this.setState({
          text: this.state.text,
        });
      }
      this.setState({
        blink: true,
      });
      this.props.multiText && (await multiTextDelay.getPromise());
    }
  };

  animateOnScroll = async () => {
    try {
      if (!this.state.animate && contentInView(this.myRef.current)) {
        this.setState({
          animate: true,
        });
        const startDelay =
          this.props.startDelay && new delay(this.props.startDelay || 100);
        this.setState({
          startDelay,
        });
        this.props.startDelay && (await startDelay.getPromise());
        this.props.multiText
          ? await this.multiTextDisplay(this.props.multiText)
          : await this.runAnimation(this.props.text);

      }
    } catch (error) { }
  };

  componentDidMount() {
    this.animateOnScroll();
    this.setState({ scrollAreaIsSet: false });
  }

  componentDidUpdate() {
    if (!this.state.scrollAreaIsSet) {
      this.setState({ scrollAreaIsSet: true });
      this.props.scrollArea && typeof this.props.scrollArea == 'object'
        ? this.props.scrollArea.addEventListener('scroll', this.animateOnScroll)
        : document.addEventListener('scroll', this.animateOnScroll);
    }
  }

  componentWillUnmount() {
    // unsubscribe from timeouts and events
    this.props.scrollArea && typeof this.props.scrollArea == 'object'
      ? this.props.scrollArea.removeEventListener(
        'scroll',
        this.animateOnScroll
      )
      : document.removeEventListener('scroll', this.animateOnScroll);
    this.state.startDelay && this.state.startDelay.cancel();
    this.state.eraseSpeedDelay && this.state.eraseSpeedDelay.cancel();
    this.state.typeSpeedDelay && this.state.typeSpeedDelay.cancel();
    this.state.multiTextDelay && this.state.multiTextDelay.cancel();
  }

  render() {
    return (
      <div ref={this.myRef} className={this.props.className ? this.props.className : 'react-typewriter-text-wrap'
      }>
        {this.props.multiText.map((_txt, index) => (
          <h1
            style={{ ...this.props.textStyle }}
            className='react-typewriter-text'
          >
            {this.state.text[index]}
            <div
              className={`react-typewriter-pointer ${this.state.blink && 'add-cursor-animate'
                } ${'hide-typing-cursor'}`}
              style={{ backgroundColor: `${this.props.cursorColor}` }}
            ></div>
          </h1>)
        )}
      </div>
    );
  }
}

TypeWriterEffect.propTypes = propTypeValidation;

export default TypeWriterEffect;