// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Consumer {
  AggregatorV3Interface internal feed;

  constructor(address _feed) {
    feed = AggregatorV3Interface(_feed);
  }

  function getLatestData() public view returns (int) {
    (
      /* uint80 roundID */,
      int answer,
      /*uint startedAt*/,
      /*uint timeStamp*/,
      /*uint80 answeredInRound*/
    ) = feed.latestRoundData();

    return answer;
  }

  function getFeed() public view returns (AggregatorV3Interface) {
    return feed;
  }
}
