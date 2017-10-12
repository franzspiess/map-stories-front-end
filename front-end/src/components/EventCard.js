import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import TweetEmbed from 'react-tweet-embed';
import ReactPlayer from 'react-player';

class EventCard extends Component {

  state = {
    expanded: false,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({expanded: true});
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});

  renderLinks = (attachment, i) => {
    const childrenWithDesc = (
      <div className="LinkChildrenWithDesc">
        <p>{attachment.description}</p>
        <div className="LinkChildren">
          <a href={attachment.link}>{attachment.title}</a>
          <img src={attachment.imageURL} alt={i}/>
        </div>
      </div>
    )
    const childrenNoDesc = (
      <div className="LinkChildren">
        <a href={attachment.link}>{attachment.title}</a>
        <img src={attachment.imageURL} alt={i}/>
      </div>
    )
    return (
      <CardMedia key={i} expandable={true}>
        {attachment.description ? (
            <CardText
              className="Link"
              key={i}
              expandable={true}
              children={childrenWithDesc}>
            </CardText>
          ) : (
            <CardText
              className="Link"
              key={i}
              expandable={true}
              children={childrenNoDesc}>
            </CardText>
          )
        }
      </CardMedia>
    )
  }

  renderVideos = (attachment, i) => {
    const children = <ReactPlayer className="Video" url={attachment.videoURL}/>;
    return <CardMedia key={i} expandable={true} children={children}></CardMedia>;
  }

  renderImages = (attachment, i) => (
    <CardMedia key={i} expandable={true}>
      <img src={attachment.imageURL} alt={i}/>
    </CardMedia>
  )

  renderTweets = (attachment, i) => {
    let tweetID = attachment.tweetURL.split('/');
    tweetID = tweetID.pop();
    const children = <TweetEmbed id={tweetID} />;
    return <CardMedia key={i} expandable={true} children={children}></CardMedia>;
  }

  renderAttachments = () => {
    if (!this.props.data.attachments) return null;
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      if (attachment.type === 'text') return <CardText key={i} expandable={true}>{attachment.text}</CardText>;
      if (attachment.type === 'img') return this.renderImages(attachment, i);
      if (attachment.type === 'link') return this.renderLinks(attachment, i);
      if (attachment.type === 'video') return this.renderVideos(attachment, i);
      if (attachment.type === 'tweet') return this.renderTweets(attachment, i);
      else return null;
    });
  }

  render() {
    const { title } = this.props.data;
    return (
      <Card className="EventCard" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
        />
        {this.renderAttachments()}
      </Card>
    );
  }
}

export default EventCard;
