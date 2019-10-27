AFRAME.registerComponent("follow", {
    schema: {
        target: { type: "selector" },
        speed: { type: "number" },
    },
    init: function() {
        this.directionVec3 = new THREE.Vector3();
    },
    tick: function (time, timeDelta) {
        var directionVec3 = this.directionVec3;
    
        // エンティティのthree.jsオブジェクトから位置ベクトル（THREE.Vector3）を取得します。
        var targetPosition = this.data.target.object3D.position;
        var currentPosition = this.el.object3D.position;
    
        // ベクトルを減算して、エンティティが向かうべき方向を取得します
        directionVec3.copy(targetPosition).sub(currentPosition);
    
        // 距離を計算します。
        var distance = directionVec3.length();
    
        // 近くに近づいたら近づかないでください。
        if (distance < 1) { return; }
    
        // 速度に合わせて方向ベクトルの大きさを縮小します。
        var factor = this.data.speed / distance;
        ['x', 'y', 'z'].forEach(function (axis) {
          directionVec3[axis] *= factor * (timeDelta / 1000);
        });
    
        // ターゲットに向かう方向にエンティティを変換します。
        this.el.setAttribute('position', {
          x: currentPosition.x + directionVec3.x,
          y: currentPosition.y + directionVec3.y,
          z: currentPosition.z + directionVec3.z
        });
      }
});